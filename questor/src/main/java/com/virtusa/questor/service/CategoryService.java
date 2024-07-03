package com.virtusa.questor.service;

import com.virtusa.questor.dao.CategoryDAO;
import com.virtusa.questor.dto.CategoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryDAO categoryDAO;

    public CategoryDTO saveCategory(CategoryDTO categoryDTO){
        return categoryDAO.saveCategory(categoryDTO);
    }

    public List<CategoryDTO> findAllCategories(){
        return categoryDAO.findAll();
    }

    public CategoryDTO findCategoryById(Long id){
        return categoryDAO.findById(id);
    }

    public void deleteCategoryById(Long id){
        categoryDAO.deleteById(id);
    }

    public CategoryDTO updateById(Long id, CategoryDTO categoryDTO) {
        return categoryDAO.updateById(id, categoryDTO);
    }

    public CategoryDTO updateCategory(CategoryDTO categoryDTO) {
        return categoryDAO.updateCategory(categoryDTO);
    }

}
