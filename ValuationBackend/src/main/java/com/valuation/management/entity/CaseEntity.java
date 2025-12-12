package com.valuation.management.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;

@Entity
@Table(name = "cases")
public class CaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer srNo;
    private String date;
    private String clientName;
    private String clientContact;
    private String valuerName;
    private String bankName;
    private String bankPersonName;
    private String visitPerson;
    private String reportDoneBy;
    private Double valuationPayment;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    private String utrNumber;

    @Enumerated(EnumType.STRING)
    private ReportStatus reportStatus;

    private String remark;
    private String reportOutdate;

    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getSrNo() { return srNo; }
    public void setSrNo(Integer srNo) { this.srNo = srNo; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientContact() { return clientContact; }
    public void setClientContact(String clientContact) { this.clientContact = clientContact; }

    public String getValuerName() { return valuerName; }
    public void setValuerName(String valuerName) { this.valuerName = valuerName; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getBankPersonName() { return bankPersonName; }
    public void setBankPersonName(String bankPersonName) { this.bankPersonName = bankPersonName; }

    public String getVisitPerson() { return visitPerson; }
    public void setVisitPerson(String visitPerson) { this.visitPerson = visitPerson; }

    public String getReportDoneBy() { return reportDoneBy; }
    public void setReportDoneBy(String reportDoneBy) { this.reportDoneBy = reportDoneBy; }

    public Double getValuationPayment() { return valuationPayment; }
    public void setValuationPayment(Double valuationPayment) { this.valuationPayment = valuationPayment; }

    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }

    public PaymentMode getPaymentMode() { return paymentMode; }
    public void setPaymentMode(PaymentMode paymentMode) { this.paymentMode = paymentMode; }

    public String getUtrNumber() { return utrNumber; }
    public void setUtrNumber(String utrNumber) { this.utrNumber = utrNumber; }

    public ReportStatus getReportStatus() { return reportStatus; }
    public void setReportStatus(ReportStatus reportStatus) { this.reportStatus = reportStatus; }

    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }

    public String getReportOutdate() { return reportOutdate; }
    public void setReportOutdate(String reportOutdate) { this.reportOutdate = reportOutdate; }

   
    // Enums with JSON mapping
    public static enum PaymentStatus {
        None("None"),
        Paid("Paid"),
        Pending("Pending");

        private final String value;
        PaymentStatus(String value) { this.value = value; }

        @JsonValue
        public String getValue() { return value; }

        @JsonCreator
        public static PaymentStatus fromValue(String value) {
            for (PaymentStatus status : PaymentStatus.values()) {
                if (status.value.equalsIgnoreCase(value)) return status;
            }
            return None;
        }
    }

    public static enum PaymentMode {
        None("None"),
        GPay("GPay"),
        PhonePe("PhonePe"),
        BankTransfer("Bank Transfer"),
        Cash("Cash"),
        UPI("UPI");

        private final String value;
        PaymentMode(String value) { this.value = value; }

        @JsonValue
        public String getValue() { return value; }

        @JsonCreator
        public static PaymentMode fromValue(String value) {
            for (PaymentMode mode : PaymentMode.values()) {
                if (mode.value.equalsIgnoreCase(value)) return mode;
            }
            return None;
        }
    }

    public static enum ReportStatus {
        None("None"),
        Done("Done"),
        Pending("Pending");
    	
        private final String value;
        ReportStatus(String value) { this.value = value; }

        @JsonValue
        public String getValue() { return value; }

        @JsonCreator
        public static ReportStatus fromValue(String value) {
            for (ReportStatus status : ReportStatus.values()) {
                if (status.value.equalsIgnoreCase(value)) return status;
            }
            return None;
        }
    }
}
