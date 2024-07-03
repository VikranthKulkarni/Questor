package com.virtusa.questor.dao;

import com.virtusa.questor.dto.BoardDTO;
import com.virtusa.questor.model.Board;
import com.virtusa.questor.model.Project;
import com.virtusa.questor.repository.BoardRepository;
import com.virtusa.questor.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BoardDAO {

    @Autowired
    private BoardRepository boardRepo;

    @Autowired
    private TaskDAO tasksDAO;

    @Autowired
    private ProjectRepository projectRepo;

    public BoardDTO saveBoard(BoardDTO boardDTO){
        Board boardModel = toModel(boardDTO);
        Project projectModel = projectRepo.findById(boardDTO.getProjectId()).orElse(null);
        if(projectModel != null) {
            boardModel.setProject(projectModel);
            boardModel = boardRepo.save(boardModel);
            return toDTO(boardModel);
        } else {
            throw new IllegalArgumentException("project not found:" + boardDTO.getProjectId());
        }
    }

    public BoardDTO getByBoardId(Long id){
        Board boardModel = boardRepo.findById(id).orElse(null);
        return boardModel != null ? toDTO(boardModel) : null;
    }

    public List<BoardDTO> findAll(){
        List<Board> boards = boardRepo.findAll();
        return boards.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public BoardDTO updateBoardById(Long id, BoardDTO boardDTO){
        Board existingBoard = boardRepo.findById(id).orElse(null);

        if(existingBoard != null) {
            Board updatedBoard = toModel(boardDTO);
            updatedBoard.setBoardId(id);
            updatedBoard = boardRepo.save(updatedBoard);
            return toDTO(updatedBoard);
        } else {
            throw new IllegalArgumentException("board not found" + id);
        }
    }

    public BoardDTO updateBoard(BoardDTO boardDTO){
        Board existingBoard = boardRepo.findById(boardDTO.getBoardId()).orElse(null);

        if (existingBoard != null) {
            Board updatedBoard = toModel(boardDTO);
            updatedBoard = boardRepo.save(updatedBoard);
            return toDTO(updatedBoard);
        } else {
            throw new IllegalArgumentException("board not found" + boardDTO.getBoardId());
        }
    }

    public void deleteById(Long id) {
        Board board = boardRepo.findById(id).orElse(null);
        if (board != null) {
            boardRepo.delete(board);
        } else {
            throw new IllegalArgumentException("board not found" + id);
        }
    }

    public List<BoardDTO> findBoardsByProjectId(Long projectId){
        List<Board> boards = boardRepo.findByProjectId(projectId);
        return boards.stream().map(this::toDTO).collect(Collectors.toList());
    }


    public BoardDTO toDTO(Board board){
        return BoardDTO.builder()
                .boardId(board.getBoardId())
                .name(board.getName())
                .projectId(board.getProject() != null ? board.getProject().getProjectId() : null)
                .tasks(board.getTasks() != null ? board.getTasks().stream().map(tasksDAO::toDTO).collect(Collectors.toList()) : null)
                .build();
    }

    public Board toModel(BoardDTO boardDTO) {
        Board board =  Board.builder()
                .boardId(boardDTO.getBoardId())
                .name(boardDTO.getName())
                .build();

        if (boardDTO.getProjectId() != null) {
            Project projectModel = projectRepo.findById(boardDTO.getProjectId()).orElse(null);
            if (projectModel != null){
                board.setProject(projectModel);
            }
        }
        return board;
    }

}