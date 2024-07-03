package com.virtusa.questor.service;

import com.virtusa.questor.dao.SectionContentDAO;
import com.virtusa.questor.dto.SectionContentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionContentService {

    @Autowired
    private SectionContentDAO sectionContentDAO;

    public SectionContentDTO saveContent(SectionContentDTO sectionContentDTO){
        return sectionContentDAO.save(sectionContentDTO);
    }

    public List<SectionContentDTO> findAllContent(){
        return sectionContentDAO.findAll();
    }

    public SectionContentDTO findContentById(Long id){
        return sectionContentDAO.findById(id);
    }

    public void deleteContentById(Long id){
        sectionContentDAO.deleteById(id);
    }

    public List<SectionContentDTO> findBySectionId(Long sectionId) {
        return sectionContentDAO.findBySectionId(sectionId);
    }

    public SectionContentDTO updateContentById(Long id, SectionContentDTO sectionContentDTO){
        return sectionContentDAO.updateContentById(id, sectionContentDTO);
    }

    public SectionContentDTO updateContent(SectionContentDTO sectionContentDTO){
        return sectionContentDAO.updateSectionContent(sectionContentDTO);
    }

}
