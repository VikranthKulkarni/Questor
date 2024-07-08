package com.virtusa.questor.controller;

import com.virtusa.questor.dto.BoardDTO;
import com.virtusa.questor.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questor/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping("/addBoard")
    public ResponseEntity<BoardDTO> createBoard(@RequestBody BoardDTO boardDTO){
        BoardDTO savedBoard = boardService.saveBoard(boardDTO);
        return ResponseEntity.ok(savedBoard);
    }

    @GetMapping("/getBoard/{id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable Long id){
        BoardDTO boardDTO = boardService.getBoardById(id);
        return ResponseEntity.ok(boardDTO);
    }

    @GetMapping
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        return ResponseEntity.ok(boardService.getAllBoards());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BoardDTO> updateBoardById(@PathVariable Long id, @RequestBody BoardDTO boardDTO) {
        return ResponseEntity.ok(boardService.updateBoardById(id, boardDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<BoardDTO> updateBoard(@RequestBody BoardDTO boardDTO) {
        return ResponseEntity.ok(boardService.updateBoard(boardDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoardById(@PathVariable Long id) {
        boardService.deleteBoardById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/byProjectId/{projectId}")
    public List<BoardDTO> getBoardsByProjectId(@PathVariable Long projectId){
        return boardService.findBoardsByProjectId(projectId);
    }

}
