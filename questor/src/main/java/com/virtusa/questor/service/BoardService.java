package com.virtusa.questor.service;

import com.virtusa.questor.dao.BoardDAO;
import com.virtusa.questor.dto.BoardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardDAO boardDAO;

    public BoardDTO saveBoard(BoardDTO boardDTO){
        return boardDAO.saveBoard(boardDTO);
    }

    public BoardDTO getBoardById(Long id){
        return boardDAO.getByBoardId(id);
    }

    public List<BoardDTO> getAllBoards(){
        return boardDAO.findAll();
    }

    public BoardDTO updateBoardById(Long id, BoardDTO boardDTO){
        return boardDAO.updateBoardById(id, boardDTO);
    }

    public BoardDTO updateBoard(BoardDTO boardDTO){
        return boardDAO.updateBoard(boardDTO);
    }

    public void deleteBoardById(Long id){
        boardDAO.deleteById(id);
    }

    public List<BoardDTO> findBoardsByProjectId(Long projectId){
        return boardDAO.findBoardsByProjectId(projectId);
    }

}