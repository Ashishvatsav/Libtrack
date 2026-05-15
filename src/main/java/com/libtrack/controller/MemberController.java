package com.libtrack.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libtrack.entity.IssueRecord;
import com.libtrack.entity.Member;
import com.libtrack.service.MemberService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    @PostMapping
    public Member registerMember(@RequestBody Member member) {
        return memberService.registerMember(member);
    }
    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }
    @GetMapping("/{id}")
    public Member getMember(@PathVariable Long id) {
        return memberService.getMember(id);
    }
    @GetMapping("/{id}/books")
    public List<IssueRecord> getIssuedBooks(@PathVariable Long id) {
        return memberService.getIssuedBooks(id);
    }
}