package com.virtusa.questor.dao;

import com.virtusa.questor.dto.CourseSectionDTO;
import com.virtusa.questor.dto.SectionContentDTO;
import com.virtusa.questor.model.Course;
import com.virtusa.questor.model.CourseSection;
import com.virtusa.questor.model.SectionContent;
import com.virtusa.questor.repository.CourseRepository;
import com.virtusa.questor.repository.CourseSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class CourseSectionDAO {

    @Autowired
    private CourseSectionRepository courseSectionRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private SectionContentDAO sectionContentDAO;

    public CourseSectionDTO save(CourseSectionDTO courseSectionDTO) {
        CourseSection sectionModel = toModel(courseSectionDTO);
        Course course = courseRepo.findById(courseSectionDTO.getCourseId()).orElse(null);
        if (course != null) {
            sectionModel.setCourse(course);
            sectionModel = courseSectionRepo.save(sectionModel);
            return toDTO(sectionModel);
        } else {
            throw new IllegalArgumentException("Course not found: " + courseSectionDTO.getCourseId());
        }
    }

    public CourseSectionDTO findById(Long id) {
        CourseSection sectionModel = courseSectionRepo.findById(id).orElse(null);
        return sectionModel != null ? toDTO(sectionModel) : null;
    }

    public List<CourseSectionDTO> findAll() {
        List<CourseSection> sections = courseSectionRepo.findAll();
        return sections.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        CourseSection section = courseSectionRepo.findById(id).orElse(null);
        if (section != null) {
            courseSectionRepo.delete(section);
        } else {
            throw new IllegalArgumentException("Section not found: " + id);
        }
    }

    public CourseSectionDTO updateById(Long id, CourseSectionDTO courseSectionDTO) {
        CourseSection existingCourseSection = courseSectionRepo.findById(id).orElse(null);
        if (existingCourseSection != null) {
            updateCourseSectionModel(existingCourseSection, courseSectionDTO);
            existingCourseSection = courseSectionRepo.save(existingCourseSection);
            return toDTO(existingCourseSection);
        } else {
            throw new IllegalArgumentException("Course section not found: " + id);
        }
    }

    public CourseSectionDTO updateCourseSection(CourseSectionDTO courseSectionDTO) {
        CourseSection existingCourseSection = courseSectionRepo.findById(courseSectionDTO.getSectionId()).orElse(null);
        if (existingCourseSection != null) {
            updateCourseSectionModel(existingCourseSection, courseSectionDTO);
            existingCourseSection = courseSectionRepo.save(existingCourseSection);
            return toDTO(existingCourseSection);
        } else {
            throw new IllegalArgumentException("Course section not found: " + courseSectionDTO.getSectionId());
        }
    }

    private void updateCourseSectionModel(CourseSection existingCourseSection, CourseSectionDTO courseSectionDTO) {
        existingCourseSection.setSectionName(courseSectionDTO.getSectionName());
        existingCourseSection.setDescription(courseSectionDTO.getDescription());

        // Handle section contents update
        updateSectionContents(existingCourseSection, courseSectionDTO.getContents());
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

    public List<CourseSectionDTO> findByCourseId(Long courseId) {
        List<CourseSection> courseSections = courseSectionRepo.findByCourseId(courseId);
        return courseSections.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public CourseSectionDTO toDTO(CourseSection courseSection) {
        return CourseSectionDTO.builder()
                .sectionId(courseSection.getSectionId())
                .sectionName(courseSection.getSectionName())
                .description(courseSection.getDescription())
                .courseId(courseSection.getCourse() != null ? courseSection.getCourse().getCourseId() : null)
                .contents(courseSection.getContents() != null ? courseSection.getContents().stream().map(sectionContentDAO::toDTO).collect(Collectors.toList()) : null)
                .build();
    }

    public CourseSection toModel(CourseSectionDTO sectionDTO) {
        CourseSection section = CourseSection.builder()
                .sectionId(sectionDTO.getSectionId())
                .sectionName(sectionDTO.getSectionName())
                .description(sectionDTO.getDescription())
                .build();

        if (sectionDTO.getCourseId() != null) {
            Course course = courseRepo.findById(sectionDTO.getCourseId()).orElse(null);
            if (course != null) {
                section.setCourse(course);
            }
        }
        return section;
    }
}
