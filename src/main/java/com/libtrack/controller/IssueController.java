package com.libtrack.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libtrack.dto.IssueRequest;
import com.libtrack.entity.IssueRecord;
import com.libtrack.service.IssueService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/issues")
@RequiredArgsConstructor
public class IssueController {
    private final IssueService issueService;
    @GetMapping
    public List<IssueRecord> getAllIssues() {
        return issueService.getAllIssues();
    }
    @PostMapping("/issue")
    public IssueRecord issueBook(@RequestBody IssueRequest request) {
        return issueService.issueBook(request);
    }
    @PutMapping("/return/{issueId}")
    public IssueRecord returnBook(@PathVariable Long issueId) {
        return issueService.returnBook(issueId);
    }
}