package com.virtusa.questor.repository;

import com.virtusa.questor.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WishlistRepository extends JpaRepository<Wishlist,Long> {

    @Query("select w from Wishlist w where w.user.userId = :userId")
    Wishlist findByUserId(Long userId);

}