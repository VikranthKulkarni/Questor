package com.virtusa.questor.dao;

import com.virtusa.questor.dto.SectionContentDTO;
import com.virtusa.questor.model.CourseSection;
import com.virtusa.questor.model.SectionContent;
import com.virtusa.questor.repository.CourseSectionRepository;
import com.virtusa.questor.repository.SectionContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SectionContentDAO {

    @Autowired
    private SectionContentRepository sectionContentRepo;

    @Autowired
    private CourseSectionRepository courseSectionRepo;

    public SectionContentDTO save(SectionContentDTO sectionContentDTO) {
        SectionContent contentModel = toModel(sectionContentDTO);
        CourseSection section = courseSectionRepo.findById(sectionContentDTO.getSectionId()).orElse(null);
        if (section != null) {
            contentModel.setSection(section);
            contentModel = sectionContentRepo.save(contentModel);
            return toDTO(contentModel);
        } else {
            throw new IllegalArgumentException("Section not found: " + sectionContentDTO.getSectionId());
        }
    }

    public SectionContentDTO findById(Long id) {
        SectionContent contentModel = sectionContentRepo.findById(id).orElse(null);
        return contentModel != null ? toDTO(contentModel) : null;
    }

    public List<SectionContentDTO> findAll() {
        List<SectionContent> contents = sectionContentRepo.findAll();
        return contents.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        SectionContent content = sectionContentRepo.findById(id).orElse(null);
        if (content != null) {
            sectionContentRepo.delete(content);
        } else {
            throw new IllegalArgumentException("Content not found: " + id);
        }
    }

    public SectionContentDTO updateContentById(Long id, SectionContentDTO sectionContentDTO){
        SectionContent existingSectionContent = sectionContentRepo.findById(id).orElse(null);
        if (existingSectionContent != null){
            SectionContent updatedSectionContent = toModel(sectionContentDTO);
            updatedSectionContent.setContentId(id);
            updatedSectionContent = sectionContentRepo.save(updatedSectionContent);
            return toDTO(updatedSectionContent);
        } else {
            throw new IllegalArgumentException("Section content not found: " + id);
        }
    }

    public SectionContentDTO updateSectionContent(SectionContentDTO sectionContentDTO){
        SectionContent existingSectionContent = sectionContentRepo.findById(sectionContentDTO.getContentId()).orElse(null);
        if (existingSectionContent != null){
            SectionContent updatedSectionContent = toModel(sectionContentDTO);
            updatedSectionContent = sectionContentRepo.save(updatedSectionContent);
            return toDTO(updatedSectionContent);
        } else {
            throw new IllegalArgumentException("Section content not found: " + sectionContentDTO.getContentId());
        }
    }

    public List<SectionContentDTO> findBySectionId(Long sectionId){
        List<SectionContent> sectionContents = sectionContentRepo.findBySectionId(sectionId);
        return sectionContents.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public SectionContentDTO toDTO(SectionContent content) {
        return SectionContentDTO.builder()
                .contentId(content.getContentId())
                .title(content.getTitle())
                .type(content.getType())
                .duration(content.getDuration())
                .description(content.getDescription())
                .url(content.getUrl())
                .sectionId(content.getSection() != null ? content.getSection().getSectionId() : null)
                .build();
    }

    public SectionContent toModel(SectionContentDTO sectionContentDTO){
        SectionContent content = SectionContent.builder()
                .contentId(sectionContentDTO.getContentId())
                .title(sectionContentDTO.getTitle())
                .type(sectionContentDTO.getType())
                .duration(sectionContentDTO.getDuration())
                .description(sectionContentDTO.getDescription())
                .url(sectionContentDTO.getUrl())
                .build();

        if (sectionContentDTO.getSectionId() != null){
            CourseSection sectionModel = courseSectionRepo.findById(sectionContentDTO.getSectionId()).orElse(null);
            if(sectionModel != null){
                content.setSection(sectionModel);
            }
        }

        return content;
    }

}
