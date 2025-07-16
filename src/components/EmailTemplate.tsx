import React from 'react';

interface EmailTemplateProps {
  customerName: string;
  mobile: string;
  email: string;
  address: string;
  products: string;
  alreadyBought: string;
  deliveryMode: string;
  rating: number;
  ratingDescription: string;
  feedback: string;
  reviewDate: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  customerName,
  mobile,
  email,
  address,
  products,
  alreadyBought,
  deliveryMode,
  rating,
  ratingDescription,
  feedback,
  reviewDate
}) => {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#f8fafc'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
        color: 'white',
        padding: '30px',
        textAlign: 'center',
        borderRadius: '8px 8px 0 0'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: 'bold' }}>
          N2H ENTERPRISES
        </h1>
        <p style={{ margin: '0', fontSize: '14px', opacity: '0.9' }}>
          New Customer Review Received
        </p>
      </div>

      {/* Content */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Customer Information */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ 
            color: '#1f2937', 
            fontSize: '20px', 
            marginBottom: '15px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            Customer Information
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151', width: '30%' }}>
                Name:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {customerName}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>
                Mobile:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {mobile}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>
                Email:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {email}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>
                Address:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {address}
              </td>
            </tr>
          </table>
        </div>

        {/* Product Information */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ 
            color: '#1f2937', 
            fontSize: '20px', 
            marginBottom: '15px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            Product Information
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151', width: '30%' }}>
                Products:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {products}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>
                Already Bought:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {alreadyBought}
              </td>
            </tr>
            {deliveryMode && (
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#374151' }}>
                  Delivery Mode:
                </td>
                <td style={{ padding: '8px 0', color: '#6b7280' }}>
                  {deliveryMode}
                </td>
              </tr>
            )}
          </table>
        </div>

        {/* Rating & Feedback */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ 
            color: '#1f2937', 
            fontSize: '20px', 
            marginBottom: '15px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            Rating & Feedback
          </h2>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ fontWeight: 'bold', color: '#374151' }}>Rating: </span>
            <span style={{ 
              display: 'inline-block',
              backgroundColor: '#fbbf24',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {rating}/5 - {ratingDescription}
            </span>
          </div>
          <div style={{ 
            backgroundColor: '#f9fafb',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ margin: '0', color: '#6b7280', lineHeight: '1.5' }}>
              {feedback}
            </p>
          </div>
        </div>

        {/* Review Date */}
        <div style={{ 
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb',
          color: '#9ca3af',
          fontSize: '14px'
        }}>
          Review submitted on {reviewDate}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        color: '#6b7280',
        fontSize: '12px'
      }}>
        <p style={{ margin: '0' }}>
          This is an automated email from N2H ENTERPRISES review system.
        </p>
        <p style={{ margin: '10px 0 0 0' }}>
          © 2024 N2H ENTERPRISES. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default EmailTemplate;