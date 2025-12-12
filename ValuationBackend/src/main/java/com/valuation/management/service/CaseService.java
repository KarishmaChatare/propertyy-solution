package com.valuation.management.service;

import com.valuation.management.entity.CaseEntity;
import com.valuation.management.repository.CaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaseService {

    private final CaseRepository caseRepository;

    public CaseService(CaseRepository caseRepository) {
        this.caseRepository = caseRepository;
    }

    public List<CaseEntity> getAllCases() {
        return caseRepository.findAll();
    }

    public Optional<CaseEntity> getCaseById(Long id) {
        return caseRepository.findById(id);
    }

    public CaseEntity createCase(CaseEntity c) {
        return caseRepository.save(c);
    }

    public CaseEntity updateCase(Long id, CaseEntity updatedCase) {
        return caseRepository.findById(id)
                .map(c -> {
                    c.setSrNo(updatedCase.getSrNo());
                    c.setDate(updatedCase.getDate());
                    c.setClientName(updatedCase.getClientName());
                    c.setClientContact(updatedCase.getClientContact());
                    c.setValuerName(updatedCase.getValuerName());
                    c.setBankName(updatedCase.getBankName());
                    c.setBankPersonName(updatedCase.getBankPersonName());
                    c.setVisitPerson(updatedCase.getVisitPerson());
                    c.setReportDoneBy(updatedCase.getReportDoneBy());
                    c.setValuationPayment(updatedCase.getValuationPayment());
                    c.setPaymentStatus(updatedCase.getPaymentStatus());
                    c.setPaymentMode(updatedCase.getPaymentMode());
                    c.setUtrNumber(updatedCase.getUtrNumber());
                    c.setReportStatus(updatedCase.getReportStatus());
                    c.setRemark(updatedCase.getRemark());
                    c.setReportOutdate(updatedCase.getReportOutdate());
                    return caseRepository.save(c);
                }).orElseThrow(() -> new RuntimeException("Case not found"));
    }

    public void deleteCase(Long id) {
        caseRepository.deleteById(id);
    }
}
