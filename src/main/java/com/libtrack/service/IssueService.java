package com.libtrack.service;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.libtrack.dto.IssueRequest;
import com.libtrack.entity.Book;
import com.libtrack.entity.IssueRecord;
import com.libtrack.entity.Member;
import com.libtrack.exception.ResourceNotFoundException;
import com.libtrack.repository.BookRepository;
import com.libtrack.repository.IssueRecordRepository;
import com.libtrack.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class IssueService {
    private final IssueRecordRepository issueRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    public IssueRecord issueBook(IssueRequest request) {
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
        if (!book.getAvailability()) {
            throw new RuntimeException("Book is already issued");
        }
        List<IssueRecord> activeIssues =
                issueRepository.findByMemberMemberIdAndReturnDateIsNull(member.getMemberId());
        if (activeIssues.size() >= 2) {
            throw new RuntimeException("Member can issue maximum 2 books before returning them");
        }
        book.setAvailability(false);
        bookRepository.save(book);
        IssueRecord issue = new IssueRecord();
        issue.setBook(book);
        issue.setMember(member);
        issue.setIssueDate(LocalDate.now());
        return issueRepository.save(issue);
    }
    public IssueRecord returnBook(Long issueId) {
        IssueRecord issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue record not found"));
        issue.setReturnDate(LocalDate.now());
        Book book = issue.getBook();
        book.setAvailability(true);
        bookRepository.save(book);
        return issueRepository.save(issue);
    }
    public List<IssueRecord> getAllIssues() {
        return issueRepository.findAll();
    }
}