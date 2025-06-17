type StudentType = {
  id: string;
  name: string;
  registration: string;
  certificate: CertificateType;
};

type CertificateType = {
  id: string;
  publication_date: string;
  publication_page: string;
  certificate_number: string;
  second_issue: string;
  book: string;
  book_page: string;
  enrollment_start: string;
  enrollment_end: string;
  process_number: string;
};
