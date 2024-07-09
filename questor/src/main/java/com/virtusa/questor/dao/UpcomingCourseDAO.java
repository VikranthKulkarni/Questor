package com.virtusa.questor.dao;

import com.virtusa.questor.dto.UpcomingCourseDTO;
import com.virtusa.questor.model.Category;
import com.virtusa.questor.model.UpcomingCourse;
import com.virtusa.questor.repository.CategoryRepository;
import com.virtusa.questor.repository.UpcomingCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UpcomingCourseDAO {

    @Autowired
    private UpcomingCourseRepository upcomingCourseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public long upcomingCourseCount() {
        return upcomingCourseRepository.count();
    }

    public UpcomingCourseDTO save(UpcomingCourseDTO upcomingCourseDTO) {
        UpcomingCourse upcomingCourseModel = toModel(upcomingCourseDTO);
        Category categoryModel = categoryRepository.findById(upcomingCourseDTO.getCategoryId()).orElse(null);
        if (categoryModel != null) {
            upcomingCourseModel.setCategory(categoryModel);
            upcomingCourseModel = upcomingCourseRepository.save(upcomingCourseModel);
            return toDTO(upcomingCourseModel);
        } else {
            throw new IllegalArgumentException("Category not found: " + upcomingCourseDTO.getCategoryId());
        }
    }

    public UpcomingCourseDTO findById(Long id) {
        UpcomingCourse upcomingCourseModel = upcomingCourseRepository.findById(id).orElse(null);
        return upcomingCourseModel != null ? toDTO(upcomingCourseModel) : null;
    }

    public List<UpcomingCourseDTO> findAll() {
        List<UpcomingCourse> upcomingCourses = upcomingCourseRepository.findAll();
        return upcomingCourses.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        UpcomingCourse upcomingCourse = upcomingCourseRepository.findById(id).orElse(null);
        if (upcomingCourse != null) {
            upcomingCourseRepository.delete(upcomingCourse);
        } else {
            throw new IllegalArgumentException("Upcoming Course not found: " + id);
        }
    }

    public UpcomingCourseDTO updateById(Long id, UpcomingCourseDTO upcomingCourseDTO) {
        UpcomingCourse existingUpcomingCourse = upcomingCourseRepository.findById(id).orElse(null);
        if (existingUpcomingCourse != null) {
            updateUpcomingCourseModel(existingUpcomingCourse, upcomingCourseDTO);
            existingUpcomingCourse = upcomingCourseRepository.save(existingUpcomingCourse);
            return toDTO(existingUpcomingCourse);
        } else {
            throw new IllegalArgumentException("Upcoming Course not found: " + id);
        }
    }

    private void updateUpcomingCourseModel(UpcomingCourse existingUpcomingCourse, UpcomingCourseDTO upcomingCourseDTO) {
        existingUpcomingCourse.setCourseName(upcomingCourseDTO.getCourseName());
        existingUpcomingCourse.setDescription(upcomingCourseDTO.getDescription());
        existingUpcomingCourse.setExpectedDuration(upcomingCourseDTO.getExpectedDuration());
        existingUpcomingCourse.setPromotionalImage(upcomingCourseDTO.getPromotionalImage());
        existingUpcomingCourse.setExpectedReleaseDate(upcomingCourseDTO.getExpectedReleaseDate());
        existingUpcomingCourse.setStatus(upcomingCourseDTO.getStatus());
        existingUpcomingCourse.setPrerequisites(upcomingCourseDTO.getPrerequisites());
        existingUpcomingCourse.setPromotionalDescription(upcomingCourseDTO.getPromotionalDescription());

        if (upcomingCourseDTO.getCategoryId() != null) {
            Category categoryModel = categoryRepository.findById(upcomingCourseDTO.getCategoryId()).orElse(null);
            if (categoryModel != null) {
                existingUpcomingCourse.setCategory(categoryModel);
            }
        }
    }

    public UpcomingCourseDTO toDTO(UpcomingCourse upcomingCourse) {
        return UpcomingCourseDTO.builder()
                .upcomingCourseId(upcomingCourse.getUpcomingCourseId())
                .courseName(upcomingCourse.getCourseName())
                .description(upcomingCourse.getDescription())
                .expectedDuration(upcomingCourse.getExpectedDuration())
                .promotionalImage(upcomingCourse.getPromotionalImage())
                .expectedReleaseDate(upcomingCourse.getExpectedReleaseDate())
                .status(upcomingCourse.getStatus())
                .prerequisites(upcomingCourse.getPrerequisites())
                .promotionalDescription(upcomingCourse.getPromotionalDescription())
                .categoryId(upcomingCourse.getCategory() != null ? upcomingCourse.getCategory().getCategoryId() : null)
                .build();
    }

    public UpcomingCourse toModel(UpcomingCourseDTO upcomingCourseDTO) {
        UpcomingCourse upcomingCourse = UpcomingCourse.builder()
                .upcomingCourseId(upcomingCourseDTO.getUpcomingCourseId())
                .courseName(upcomingCourseDTO.getCourseName())
                .description(upcomingCourseDTO.getDescription())
                .expectedDuration(upcomingCourseDTO.getExpectedDuration())
                .promotionalImage(upcomingCourseDTO.getPromotionalImage())
                .expectedReleaseDate(upcomingCourseDTO.getExpectedReleaseDate())
                .status(upcomingCourseDTO.getStatus())
                .prerequisites(upcomingCourseDTO.getPrerequisites())
                .promotionalDescription(upcomingCourseDTO.getPromotionalDescription())
                .build();

        if (upcomingCourseDTO.getCategoryId() != null) {
            Category categoryModel = categoryRepository.findById(upcomingCourseDTO.getCategoryId()).orElse(null);
            if (categoryModel != null) {
                upcomingCourse.setCategory(categoryModel);
            }
        }
        return upcomingCourse;
    }
}
