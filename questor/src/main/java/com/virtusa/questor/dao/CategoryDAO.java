package com.virtusa.questor.dao;

import com.virtusa.questor.dto.CategoryDTO;
import com.virtusa.questor.model.Category;
import com.virtusa.questor.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryDAO {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CourseDAO courseDAO;

    public CategoryDTO saveCategory(CategoryDTO categoryDTO){
        Category categoryModel = toModel(categoryDTO);
        categoryModel = categoryRepository.save(categoryModel);
        return toDTO(categoryModel);
    }

    public CategoryDTO findById(Long id){
        Category categoryModel = categoryRepository.findById(id).orElse(null);
        return categoryModel != null ? toDTO(categoryModel) : null;
    }

    public List<CategoryDTO> findAll(){
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void deleteById(Long id){
        Category categoryModel = categoryRepository.findById(id).orElse(null);
        if (categoryModel != null){
            categoryRepository.delete(categoryModel);
        } else {
            throw new IllegalArgumentException("Category not found:" + id);
        }
    }

    public CategoryDTO updateById(Long id, CategoryDTO categoryDTO){
        Category exisitingCategory = categoryRepository.findById(id).orElse(null);
        if (exisitingCategory != null) {
            Category updatedCategory = toModel(categoryDTO);
            updatedCategory.setCategoryId(id);
            updatedCategory = categoryRepository.save(updatedCategory);
            return toDTO(updatedCategory);
        } else {
            throw new IllegalArgumentException("Category not found: "+ id);
        }
    }

    public CategoryDTO updateCategory(CategoryDTO categoryDTO){
        Category exisitingCategory = categoryRepository.findById(categoryDTO.getCategoryId()).orElse(null);
        if (exisitingCategory != null) {
            Category updatedCategory = toModel(categoryDTO);
            updatedCategory = categoryRepository.save(updatedCategory);
            return toDTO(updatedCategory);
        } else {
            throw new IllegalArgumentException("Category not found: " + categoryDTO.getCategoryId());
        }
    }

    public CategoryDTO toDTO(Category category){
        return CategoryDTO.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .courses(category.getCourses() != null ? category.getCourses().stream().map(courseDAO::toDTO).collect(Collectors.toList()) : null)
                .build();
    }

    public Category toModel(CategoryDTO categoryDTO){
        return Category.builder()
                .categoryId(categoryDTO.getCategoryId())
                .categoryName(categoryDTO.getCategoryName())
                .build();
    }

}
