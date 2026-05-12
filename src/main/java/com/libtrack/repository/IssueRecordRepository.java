package com.libtrack.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.libtrack.entity.IssueRecord;
public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
    List<IssueRecord> findByMemberMemberId(Long memberId);
    List<IssueRecord> findByMemberMemberIdAndReturnDateIsNull(Long memberId);
    boolean existsByBookBookIdAndReturnDateIsNull(Long bookId);
}