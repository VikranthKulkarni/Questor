package com.virtusa.questor.dao;

import com.virtusa.questor.dto.CategoryDTO;
import com.virtusa.questor.dto.CourseDTO;
import com.virtusa.questor.model.Category;
import com.virtusa.questor.model.Course;
import com.virtusa.questor.repository.CategoryRepository;
import com.virtusa.questor.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class CategoryDAO {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CourseRepository courseRepository;

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
        Category existingCategory = categoryRepository.findById(id).orElse(null);
        if (existingCategory != null) {
            updateCategoryModel(existingCategory, categoryDTO);
            existingCategory = categoryRepository.save(existingCategory);
            return toDTO(existingCategory);
        } else {
            throw new IllegalArgumentException("Category not found: " + id);
        }
    }

    public CategoryDTO updateCategory(CategoryDTO categoryDTO){
        Category existingCategory = categoryRepository.findById(categoryDTO.getCategoryId()).orElse(null);
        if (existingCategory != null) {
            updateCategoryModel(existingCategory, categoryDTO);
            existingCategory = categoryRepository.save(existingCategory);
            return toDTO(existingCategory);
        } else {
            throw new IllegalArgumentException("Category not found: " + categoryDTO.getCategoryId());
        }
    }

    private void updateCategoryModel(Category existingCategory, CategoryDTO categoryDTO) {
        existingCategory.setCategoryName(categoryDTO.getCategoryName());

        // Handle courses update
        updateCategoryCourses(existingCategory, categoryDTO.getCourses());
    }

    private void updateCategoryCourses(Category existingCategory, List<CourseDTO> courseDTOs) {
        Map<Long, Course> existingCoursesMap = existingCategory.getCourses().stream()
                .collect(Collectors.toMap(Course::getCourseId, course -> course));

        List<Course> updatedCourses = new ArrayList<>();

        for (CourseDTO courseDTO : courseDTOs) {
            Course course = existingCoursesMap.getOrDefault(courseDTO.getCourseId(), new Course());
            course.setCourseName(courseDTO.getCourseName());
            course.setDescription(courseDTO.getDescription());
            course.setDuration(courseDTO.getDuration());
            course.setCourseImage(courseDTO.getCourseImage());
            course.setCategory(existingCategory);
            updatedCourses.add(course);
        }

        existingCategory.getCourses().clear();
        existingCategory.getCourses().addAll(updatedCourses);
    }

    public CategoryDTO toDTO(Category category){
        return CategoryDTO.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .courses(category.getCourses() != null ? category.getCourses().stream().map(courseDAO::toDTO).collect(Collectors.toList()) : null)
                .build();
    }

    public Category toModel(CategoryDTO categoryDTO){
        Category category = Category.builder()
                .categoryId(categoryDTO.getCategoryId())
                .categoryName(categoryDTO.getCategoryName())
                .build();

        if (categoryDTO.getCourses() != null) {
            List<Course> courses = categoryDTO.getCourses().stream()
                    .map(courseDAO::toModel)
                    .collect(Collectors.toList());
            category.setCourses(courses);
        }

        return category;
    }
}
