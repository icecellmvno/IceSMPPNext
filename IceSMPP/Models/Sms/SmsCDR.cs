namespace IceSMPP.Models.Sms;
using System;
using System.ComponentModel.DataAnnotations;
public class SmsCDRModel
{
    public class SmsCdr
    {
        [Key]
        public int Id { get; set; }                           // cdr_id

        [Required]
        public string MessageId { get; set; }                    // message_id

        [Required]
        public int CustomerId { get; set; }                      // customer_id

        [Required]
        public string CustomerUser { get; set; }                 // customer_user

        [Required]
        public ConnectionType ConnectionType { get; set; }       // connection_type (http veya smpp)

        public string SrcIp { get; set; }                        // src_ip
        public string DstIp { get; set; }                        // dst_ip

        [Required]
        public string SenderMsisdn { get; set; }                 // sender_msisdn

        [Required]
        public string ReceiverMsisdn { get; set; }               // receiver_msisdn

        [Required]
        public DateTime SendTimestamp { get; set; }              // send_timestamp

        public DateTime? DeliveryTimestamp { get; set; }         // delivery_timestamp (nullable)
        public DateTime? ScheduledTimestamp { get; set; }        // scheduled_timestamp (nullable)

        [Required]
        public string SmsStatus { get; set; }                    // sms_status

        [Required]
        public SmsType SmsType { get; set; }                     // sms_type (normal veya flash)

        [Required]
        public Direction Direction { get; set; }                 // direction (mt: Mobile Terminated, mo: Mobile Originated)

        [Required]
        public int MessageLength { get; set; }                   // message_length

        public string MessageContent { get; set; }               // message_content

        [Required]
        public decimal SmsPrice { get; set; }                    // sms_price

        [Required]
        public decimal SalePrice { get; set; }                   // sale_price

        [Required]
        public decimal CostPrice { get; set; }                   // cost_price

        [Required]
        public int SmsCount { get; set; } = 1;                   // sms_count

        public string ErrorCode { get; set; }                    // error_code

        [Required]
        public string OperatorName { get; set; }                 // operator_name

        public string OperatorMessageId { get; set; }            // operator_message_id

        [Required]
        public string GatewayId { get; set; }                    // gateway_id

        [Required]
        public string SmsCenterId { get; set; }                  // sms_center_id

        [Required]
        public string Encoding { get; set; }                     // encoding

        [Required]
        public string Dcs { get; set; }                          // dcs

        [Required]
        public string ChargeIndicator { get; set; }              // charge_indicator

        public string RouteInfo { get; set; }                    // route_info

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // created_at

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // updated_at
    }

    public enum ConnectionType
    {
        Http,
        Smpp
    }

    public enum SmsType
    {
        Normal,
        Flash
    }

    public enum Direction
    {
        Mt, // Mobile Terminated
        Mo  // Mobile Originated
    }
}
