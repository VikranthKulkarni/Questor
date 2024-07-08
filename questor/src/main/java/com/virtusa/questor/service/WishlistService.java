package com.virtusa.questor.service;

import com.virtusa.questor.dao.WishlistDAO;
import com.virtusa.questor.dto.WishlistDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistDAO wishlistDAO;

    public WishlistDTO save(WishlistDTO wishlistDTO){
        return wishlistDAO.save(wishlistDTO);
    }

    public List<WishlistDTO> findAll(){
        return wishlistDAO.findAll();
    }

    public WishlistDTO findWishlistById(Long id){
        return wishlistDAO.findById(id);
    }

    public void deleteWishlistById(Long id){
        wishlistDAO.deleteById(id);
    }

    public WishlistDTO findByUserId(Long userId){
        return wishlistDAO.findByUserId(userId);
    }

    public WishlistDTO addCourseToWishlist(Long wishlistId, Long courseId){
        return wishlistDAO.addCourseToWishlist(wishlistId,courseId);
    }

    public WishlistDTO deleteCourseFromWishlist(Long wishlistId, Long courseId){
        return wishlistDAO.deleteCourseFromWishlist(wishlistId,courseId);
    }

}
