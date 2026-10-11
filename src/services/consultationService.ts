import { ConsultationRequest } from '../types';

export const TARGET_CONSULTATION_EMAIL = 'vanhuutyk42@gmail.com';

export interface SendConsultationPayload {
  fullName: string;
  phone: string;
  email?: string;
  petName?: string;
  petType?: 'Chó' | 'Mèo' | 'Khác';
  doctorName?: string;
  serviceInterest?: string;
  message: string;
}

export interface SendConsultationResult {
  success: boolean;
  mailtoUrl: string;
  gmailWebUrl: string;
  record: ConsultationRequest;
  message?: string;
}

/**
 * Tạo nội dung email có cấu trúc chuẩn y khoa thú y
 */
export const buildConsultationEmailBody = (data: SendConsultationPayload, timestamp: string): string => {
  return [
    `YÊU CẦU TƯ VẤN SỨC KHỎE THÚ CƯNG`,
    `----------------------------------------`,
    `Phòng khám thú y Hòa Vang`,
    `Thời gian gửi: ${timestamp}`,
    ``,
    `THÔNG TIN KHÁCH HÀNG:`,
    `- Họ và tên: ${data.fullName}`,
    `- Số điện thoại: ${data.phone}`,
    `- Email liên hệ: ${data.email || 'Chưa cung cấp'}`,
    ``,
    `THÔNG TIN THÚ CƯNG & VẤN ĐỀ:`,
    `- Thú cưng: ${data.petName || 'Thú cưng'} (${data.petType || 'Chó/Mèo'})`,
    `- Bác sĩ chỉ định: ${data.doctorName || 'Bác sĩ phiên trực gần nhất'}`,
    `- Dịch vụ / Vấn đề quan tâm: ${data.serviceInterest || 'Tư vấn sức khỏe chung'}`,
    ``,
    `NỘI DUNG CHI TIẾT & TRIỆU CHỨNG:`,
    `${data.message}`,
    `----------------------------------------`,
    `Gửi từ hệ thống Website Phòng Khám Thú Y Hòa Vang (hoavangpet.vn)`,
  ].join('\n');
};

/**
 * Gửi yêu cầu tư vấn trực tiếp đến hòm thư vanhuutyk42@gmail.com
 */
export const sendConsultationRequest = async (
  payload: SendConsultationPayload
): Promise<SendConsultationResult> => {
  const now = new Date();
  const timeFormatted = now.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const subject = `[Tư Vấn Thú Y Hòa Vang] ${payload.fullName} - ${payload.phone} (${payload.petType || 'Thú cưng'})`;
  const bodyText = buildConsultationEmailBody(payload, timeFormatted);

  // Tạo URL mailto và Web Gmail tiện dụng
  const mailtoUrl = `mailto:${TARGET_CONSULTATION_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyText)}`;

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    TARGET_CONSULTATION_EMAIL
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  const newRecord: ConsultationRequest = {
    id: `consult-${Date.now()}`,
    fullName: payload.fullName.trim(),
    phone: payload.phone.trim(),
    email: payload.email?.trim(),
    petName: payload.petName?.trim(),
    petType: payload.petType,
    doctorName: payload.doctorName,
    serviceInterest: payload.serviceInterest,
    message: payload.message.trim(),
    createdAt: now.toISOString(),
    status: 'sent',
  };

  // Lưu lại vào LocalStorage để khách hàng tra cứu lại lịch sử tư vấn
  try {
    const existing = localStorage.getItem('hoavang_vet_consultations');
    const list: ConsultationRequest[] = existing ? JSON.parse(existing) : [];
    list.unshift(newRecord);
    localStorage.setItem('hoavang_vet_consultations', JSON.stringify(list.slice(0, 30)));
  } catch (err) {
    console.warn('Could not save to localStorage', err);
  }

  // Thử gửi ngầm qua Formsubmit API đến vanhuutyk42@gmail.com
  let apiSuccess = false;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const res = await fetch(`https://formsubmit.co/ajax/${TARGET_CONSULTATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        _replyto: payload.email || TARGET_CONSULTATION_EMAIL,
        'Họ và tên khách hàng': payload.fullName,
        'Số điện thoại': payload.phone,
        'Email phản hồi': payload.email || 'Chưa cung cấp',
        'Thú cưng': `${payload.petName || 'Thú cưng'} (${payload.petType || 'Chó/Mèo'})`,
        'Bác sĩ phụ trách': payload.doctorName || 'Bác sĩ phiên trực gần nhất',
        'Dịch vụ quan tâm': payload.serviceInterest || 'Tư vấn sức khỏe chung',
        'Nội dung câu hỏi / Triệu chứng': payload.message,
        'Thời gian gửi': timeFormatted,
      }),
    });

    clearTimeout(timeoutId);
    if (res.ok) {
      apiSuccess = true;
    }
  } catch (error) {
    console.log('Background API submission notice (client mailto ready):', error);
  }

  return {
    success: apiSuccess,
    mailtoUrl,
    gmailWebUrl,
    record: newRecord,
    message: apiSuccess
      ? `Đã gửi thành công yêu cầu tư vấn đến hộp thư: ${TARGET_CONSULTATION_EMAIL}`
      : `Đã chuẩn bị thông tin gửi tới ${TARGET_CONSULTATION_EMAIL}`,
  };
};
