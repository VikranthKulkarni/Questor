package com.virtusa.questor.dao;

import com.virtusa.questor.dto.CourseDTO;
import com.virtusa.questor.dto.CourseSectionDTO;
import com.virtusa.questor.dto.SectionContentDTO;
import com.virtusa.questor.model.Category;
import com.virtusa.questor.model.Course;
import com.virtusa.questor.model.CourseSection;
import com.virtusa.questor.model.SectionContent;
import com.virtusa.questor.repository.CategoryRepository;
import com.virtusa.questor.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class CourseDAO {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CourseSectionDAO courseSectionDAO;

    public long courseCount(){
        return courseRepository.count();
    }

    public CourseDTO save(CourseDTO courseDTO) {
        Course courseModel = toModel(courseDTO);
        Category categoryModel = categoryRepository.findById(courseDTO.getCategoryId()).orElse(null);
        if (categoryModel != null){
            courseModel.setCategory(categoryModel);
            courseModel = courseRepository.save(courseModel);
            return toDTO(courseModel);
        } else {
            throw new IllegalArgumentException("Category not found: " + courseDTO.getCategoryId());
        }
    }

    public CourseDTO findById(Long id) {
        Course courseModel = courseRepository.findById(id).orElse(null);
        return courseModel != null ? toDTO(courseModel) : null;
    }

    public List<CourseDTO> findAll() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course != null) {
            courseRepository.delete(course);
        } else {
            throw new IllegalArgumentException("Course not found: " + id);
        }
    }

    public List<CourseDTO> findByCategoryId(Long categoryId){
        List<Course> courses = courseRepository.findByCategoryId(categoryId);
        return courses.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public CourseDTO updateById(Long id, CourseDTO courseDTO) {
        Course existingCourse = courseRepository.findById(id).orElse(null);
        if (existingCourse != null) {
            updateCourseModel(existingCourse, courseDTO);
            existingCourse = courseRepository.save(existingCourse);
            return toDTO(existingCourse);
        } else {
            throw new IllegalArgumentException("Course not found: " + id);
        }
    }

    private void updateCourseModel(Course existingCourse, CourseDTO courseDTO) {
        existingCourse.setCourseName(courseDTO.getCourseName());
        existingCourse.setDescription(courseDTO.getDescription());
        existingCourse.setDuration(courseDTO.getDuration());
        existingCourse.setCourseImage(courseDTO.getCourseImage());

        if (courseDTO.getCategoryId() != null) {
            Category categoryModel = categoryRepository.findById(courseDTO.getCategoryId()).orElse(null);
            if (categoryModel != null) {
                existingCourse.setCategory(categoryModel);
            }
        }

        // Handle sections update
        updateCourseSections(existingCourse, courseDTO.getCourseSections());
    }

    private void updateCourseSections(Course existingCourse, List<CourseSectionDTO> sectionDTOs) {
        Map<Long, CourseSection> existingSectionsMap = existingCourse.getSections().stream()
                .collect(Collectors.toMap(CourseSection::getSectionId, section -> section));

        List<CourseSection> updatedSections = new ArrayList<>();

        for (CourseSectionDTO sectionDTO : sectionDTOs) {
            CourseSection section = existingSectionsMap.getOrDefault(sectionDTO.getSectionId(), new CourseSection());
            section.setSectionName(sectionDTO.getSectionName());
            section.setDescription(sectionDTO.getDescription());
            section.setCourse(existingCourse);
            updateSectionContents(section, sectionDTO.getContents());
            updatedSections.add(section);
        }

        existingCourse.getSections().clear();
        existingCourse.getSections().addAll(updatedSections);
    }

    private void updateSectionContents(CourseSection section, List<SectionContentDTO> contentDTOs) {
        Map<Long, SectionContent> existingContentsMap = section.getContents().stream()
                .collect(Collectors.toMap(SectionContent::getContentId, content -> content));

        List<SectionContent> updatedContents = new ArrayList<>();

        for (SectionContentDTO contentDTO : contentDTOs) {
            SectionContent content = existingContentsMap.getOrDefault(contentDTO.getContentId(), new SectionContent());
            content.setTitle(contentDTO.getTitle());
            content.setType(contentDTO.getType());
            content.setDuration(contentDTO.getDuration());
            content.setDescription(contentDTO.getDescription());
            content.setUrl(contentDTO.getUrl());
            content.setSection(section);
            updatedContents.add(content);
        }

        section.getContents().clear();
        section.getContents().addAll(updatedContents);
    }



    public CourseDTO updateCourse(CourseDTO courseDTO){
        Course exisitingCourse = courseRepository.findById(courseDTO.getCourseId()).orElse(null);
        if (exisitingCourse != null){
            Course updatedCourse = toModel(courseDTO);
            updatedCourse = courseRepository.save(updatedCourse);
            return toDTO(updatedCourse);
        } else {
            throw new IllegalArgumentException("Course not found: " + courseDTO.getCourseId());
        }
    }

    public CourseDTO toDTO(Course courses){
        return CourseDTO.builder()
                .courseId(courses.getCourseId())
                .courseName(courses.getCourseName())
                .description(courses.getDescription())
                .duration(courses.getDuration())
                .courseImage(courses.getCourseImage())
                .categoryId(courses.getCategory() != null ? courses.getCategory().getCategoryId() : null)
                .courseSections(courses.getSections() != null ? courses.getSections().stream().map(courseSectionDAO::toDTO).collect(Collectors.toList()) : null)
                .build();
    }

    public Course toModel(CourseDTO courseDTO){
        Course course = Course.builder()
                .courseId(courseDTO.getCourseId())
                .courseName(courseDTO.getCourseName())
                .description(courseDTO.getDescription())
                .duration(courseDTO.getDuration())
                .courseImage(courseDTO.getCourseImage())
                .build();

        if(courseDTO.getCategoryId() != null){
            Category categoryModel = categoryRepository.findById(courseDTO.getCategoryId()).orElse(null);
            if (categoryModel != null) {
                course.setCategory(categoryModel);
            }
        }
        return course;
    }

}
