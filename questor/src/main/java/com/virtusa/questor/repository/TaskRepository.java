package com.virtusa.questor.repository;

import com.virtusa.questor.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("select t from Task t where t.board.boardId = :boardId")
    List<Task> findByBoardId(Long boardId);

}
