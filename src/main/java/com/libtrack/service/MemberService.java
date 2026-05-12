package com.libtrack.service;
import com.libtrack.entity.IssueRecord;
import com.libtrack.entity.Member;
import com.libtrack.exception.ResourceNotFoundException;
import com.libtrack.repository.IssueRecordRepository;
import com.libtrack.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final IssueRecordRepository issueRecordRepository;
    public Member registerMember(Member member) {
        return memberRepository.save(member);
    }
    public Member getMember(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
    }
    public List<IssueRecord> getIssuedBooks(Long memberId) {
        return issueRecordRepository.findByMemberMemberId(memberId);
    }
}