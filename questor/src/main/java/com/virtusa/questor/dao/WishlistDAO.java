package com.virtusa.questor.dao;

import com.virtusa.questor.dto.WishlistDTO;
import com.virtusa.questor.model.Course;
import com.virtusa.questor.model.User;
import com.virtusa.questor.model.Wishlist;
import com.virtusa.questor.repository.CourseRepository;
import com.virtusa.questor.repository.UserRepository;
import com.virtusa.questor.repository.WishlistRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class WishlistDAO {

    @Autowired
    private WishlistRepository wishlistRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private CourseDAO courseDAO;

    public WishlistDTO save(WishlistDTO wishlistDTO) {
        Wishlist wishlistModel = toModel(wishlistDTO);
        User user = userRepo.findById(wishlistDTO.getUserId()).orElse(null);
        if (user != null) {
            wishlistModel.setUser(user);
            wishlistModel = wishlistRepo.save(wishlistModel);
            return toDTO(wishlistModel);
        } else {
            throw new IllegalArgumentException("User not found: " + wishlistDTO.getUserId());
        }
    }

    public WishlistDTO findById(Long id) {
        Wishlist wishlistModel = wishlistRepo.findById(id).orElse(null);
        return wishlistModel != null ? toDTO(wishlistModel) : null;
    }

    public List<WishlistDTO> findAll() {
        List<Wishlist> wishlists = wishlistRepo.findAll();
        return wishlists.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        Wishlist wishlist = wishlistRepo.findById(id).orElse(null);
        if (wishlist != null) {
            wishlistRepo.delete(wishlist);
        } else {
            throw new IllegalArgumentException("Wishlist not found: " + id);
        }
    }

    public WishlistDTO findByUserId(Long userId){
        return toDTO(wishlistRepo.findByUserId(userId));
    }

    @Transactional
    public WishlistDTO addCourseToWishlist(Long wishlistId, Long courseId) {
        Wishlist wishlist = wishlistRepo.findById(wishlistId).orElse(null);
        if (wishlist != null) {
            Course course = courseRepo.findById(courseId).orElse(null);
            if (course != null) {
                wishlist.getCourses().add(course);
                wishlist = wishlistRepo.save(wishlist);
                return toDTO(wishlist);
            } else {
                throw new IllegalArgumentException("Course not found: " + courseId);
            }
        } else {
            throw new IllegalArgumentException("Wishlist not found: " + wishlistId);
        }
    }

    @Transactional
    public WishlistDTO deleteCourseFromWishlist(Long wishlistId, Long courseId) {
        Wishlist wishlist = wishlistRepo.findById(wishlistId).orElse(null);
        if (wishlist != null) {
            Course course = courseRepo.findById(courseId).orElse(null);
            if (course != null) {
                wishlist.getCourses().remove(course);
                wishlist = wishlistRepo.save(wishlist);
                return toDTO(wishlist);
            } else {
                throw new IllegalArgumentException("Course not found: " + courseId);
            }
        } else {
            throw new IllegalArgumentException("Wishlist not found: " + wishlistId);
        }
    }

    public WishlistDTO toDTO(Wishlist wishlist) {
        return WishlistDTO.builder()
                .wishlistId(wishlist.getWishlistId())
                .userId(wishlist.getUser() != null ? wishlist.getUser().getUserId() : null)
                .courses(wishlist.getCourses() != null ? wishlist.getCourses().stream().map(courseDAO::toDTO).collect(Collectors.toList()) : null)
                .build();
    }

    public Wishlist toModel(WishlistDTO wishlistDTO) {
        Wishlist wishlist = Wishlist.builder()
                .wishlistId(wishlistDTO.getWishlistId())
                .build();

        if (wishlistDTO.getUserId() != null) {
            userRepo.findById(wishlistDTO.getUserId()).ifPresent(wishlist::setUser);
        }
        return wishlist;
    }

}
