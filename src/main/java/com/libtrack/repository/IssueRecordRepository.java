package com.libtrack.repository;
import com.libtrack.entity.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
    List<IssueRecord> findByMemberMemberId(Long memberId);
    List<IssueRecord> findByMemberMemberIdAndReturnDateIsNull(Long memberId);
    boolean existsByBookBookIdAndReturnDateIsNull(Long bookId);
}