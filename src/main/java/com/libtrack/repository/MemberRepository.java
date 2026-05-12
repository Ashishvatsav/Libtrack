package com.libtrack.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.libtrack.entity.Member;
public interface MemberRepository extends JpaRepository<Member, Long> {
}