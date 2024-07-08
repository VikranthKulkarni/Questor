package com.virtusa.questor.controller;

import com.virtusa.questor.dto.WishlistDTO;
import com.virtusa.questor.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/wishlists")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/addWishlist")
    public ResponseEntity<WishlistDTO> createWishlist(@RequestBody WishlistDTO wishlistDTO){
        WishlistDTO savedWishlist = wishlistService.save(wishlistDTO);
        return ResponseEntity.ok(savedWishlist);
    }

    @GetMapping("/getWishlist/{id}")
    public ResponseEntity<WishlistDTO> getWishlistById(@PathVariable Long id){
        WishlistDTO wishlistDTO = wishlistService.findWishlistById(id);
        return ResponseEntity.ok(wishlistDTO);
    }

    @GetMapping("/getAllWishlists")
    public ResponseEntity<List<WishlistDTO>> getAllWishlists(){
        List<WishlistDTO> wishlists = wishlistService.findAll();
        return ResponseEntity.ok(wishlists);
    }

    @DeleteMapping("/deleteWishlist/{id}")
    public ResponseEntity<Void> deleteWishlistById(@PathVariable Long id){
        wishlistService.deleteWishlistById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/addCourseToWishlist/{wishlistId}/{courseId}")
    public WishlistDTO addCourseToWishlist(@PathVariable Long wishlistId, @PathVariable Long courseId){
        return wishlistService.addCourseToWishlist(wishlistId,courseId);
    }

    @DeleteMapping("/deleteCourseFromWishlist/{wishlistId}/{courseId}")
    public WishlistDTO deleteCourseFromWishlist(@PathVariable Long wishlistId, @PathVariable Long courseId){
        return wishlistService.deleteCourseFromWishlist(wishlistId,courseId);
    }

    @GetMapping("getByUserId/{userId}")
    public WishlistDTO getWishlistByUserId(@PathVariable Long userId){
        return wishlistService.findByUserId(userId);
    }

}