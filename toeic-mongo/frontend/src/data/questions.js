export const QUESTIONS = [
  // READING
  { id: 1, mode: 'reading', part: 'Part 5', q: 'Điền vào chỗ trống:', s: "The board of directors agreed to _____ the merger proposal at next month's meeting.", opts: ['discuss','discussion','discussing','discussed'], ans: 0, ex: 'Sau "to" (infinitive) cần V nguyên thể. "discuss" ✓. "discussion" là danh từ, "discussing" là V-ing.' },
  { id: 2, mode: 'reading', part: 'Part 5', q: 'Điền vào chỗ trống:', s: 'Employees are _____ to submit their expense reports by the end of the week.', opts: ['requiring','required','require','requirement'], ans: 1, ex: '"are required to" = bị yêu cầu (passive voice). Cấu trúc: S + be + V3/ed.' },
  { id: 3, mode: 'reading', part: 'Part 5', q: 'Điền vào chỗ trống:', s: 'The company saw a _____ increase in profits during the last fiscal year.', opts: ['dramatically','dramatic','drama','dramatize'], ans: 1, ex: 'Cần tính từ (adjective) bổ nghĩa cho danh từ "increase" → "dramatic increase".' },
  { id: 4, mode: 'reading', part: 'Part 6', q: 'Chọn từ phù hợp ngữ cảnh email kinh doanh:', s: 'We would like to _____ your attention to the updated privacy policy.', opts: ['draw','pull','force','push'], ans: 0, ex: '"Draw attention to" là collocation cố định trong văn phong business.' },
  // GRAMMAR
  { id: 5, mode: 'grammar', part: 'Grammar', q: 'Câu nào đúng ngữ pháp?', s: null, opts: ['The report was submitted by the team yesterday.','The report submitted was by the team yesterday.','The team was submitted the report yesterday.','Yesterday submitted the report was the team.'], ans: 0, ex: 'Bị động đúng: S + was/were + V3 + by + O.' },
  { id: 6, mode: 'grammar', part: 'Grammar', q: 'Chọn đáp án đúng:', s: 'By the time the manager arrived, the staff _____ the presentation.', opts: ['had prepared','prepared','has prepared','were preparing'], ans: 0, ex: 'Dùng Past Perfect (had + V3) vì hành động hoàn thành TRƯỚC mốc thời gian quá khứ.' },
  { id: 7, mode: 'grammar', part: 'Grammar', q: 'Điền vào chỗ trống:', s: 'Neither the CEO nor the board members _____ aware of the issue.', opts: ['was','were','is','are'], ans: 1, ex: 'Với "Neither A nor B", động từ chia theo B (board members – số nhiều) → "were".' },
  { id: 8, mode: 'grammar', part: 'Grammar', q: 'Chọn đáp án đúng:', s: 'The new policy will be _____ starting next quarter.', opts: ['implement','implemented','implementing','implementation'], ans: 1, ex: '"will be + V3/ed" = tương lai bị động.' },
  // VOCAB
  { id: 9,  mode: 'vocab', part: 'Vocabulary', q: 'Từ nào đồng nghĩa với REMUNERATION?', s: null, opts: ['Salary / Compensation','Resignation','Reimbursement','Recommendation'], ans: 0, ex: '"Remuneration" = thù lao, lương thưởng. Phổ biến trong TOEIC Part 7.' },
  { id: 10, mode: 'vocab', part: 'Vocabulary', q: 'EXPEDITE trong "expedite the process" có nghĩa là gì?', s: null, opts: ['Speed up / Accelerate','Cancel','Review','Postpone'], ans: 0, ex: '"Expedite" = đẩy nhanh, làm gấp.' },
  { id: 11, mode: 'vocab', part: 'Vocabulary', q: 'Chọn từ phù hợp:', s: 'The contract is _____ pending final approval from headquarters.', opts: ['provisional','permanent','confirmed','revised'], ans: 0, ex: '"Provisional" = tạm thời, chưa chính thức.' },
  { id: 12, mode: 'vocab', part: 'Vocabulary', q: 'ACKNOWLEDGE trong email kinh doanh có nghĩa là gì?', s: null, opts: ['Xác nhận đã nhận / Thừa nhận','Từ chối','Chuyển tiếp','Yêu cầu thêm'], ans: 0, ex: '"Acknowledge receipt of your email" = Xác nhận đã nhận email. Rất thường gặp trong TOEIC.' },
  // LISTENING
  { id: 13, mode: 'listening', part: 'Part 4', q: 'Đọc đoạn sau và chọn nơi thông báo được phát:', s: '"Attention all passengers: Flight VN302 to Hanoi is now boarding at Gate 12."', opts: ['Sân bay','Nhà ga tàu hỏa','Bến xe buýt','Trung tâm thương mại'], ans: 0, ex: 'Từ khóa: "passengers", "Flight", "Gate", "boarding pass" → thông báo sân bay.' },
  { id: 14, mode: 'listening', part: 'Part 3', q: 'Cuộc hội thoại này diễn ra ở đâu?', s: '"A: I\'d like to return this jacket. B: Do you have your receipt?"', opts: ['Cửa hàng bán lẻ','Ngân hàng','Nhà hàng','Bưu điện'], ans: 0, ex: 'Từ khóa: "return", "jacket", "receipt" → cửa hàng bán lẻ.' },
];

export const MODES = [
  { id: 'reading',   icon: '📖', label: 'Reading',    sub: 'Part 5–7' },
  { id: 'grammar',   icon: '✏️',  label: 'Grammar',    sub: 'Ngữ pháp' },
  { id: 'vocab',     icon: '📝', label: 'Vocabulary', sub: 'Từ vựng' },
  { id: 'listening', icon: '🎧', label: 'Listening',  sub: 'Part 1–4' },
];

export const VOCAB_CHIPS = ['negotiate','remuneration','implement','acknowledge','expedite','provisional'];
