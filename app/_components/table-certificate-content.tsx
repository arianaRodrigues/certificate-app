import { TableBody, TableCell, TableRow } from "./ui/table";

type TableCertificateContentProps = {
  students: StudentType[];
};

export const TableCertificateContent = ({
  students,
}: TableCertificateContentProps) => {
  return (
    <TableBody>
      {students.map((student, i) => (
        <TableRow
          key={student.id}
          className={i % 2 === 0 ? "bg-white" : "bg-gray-200"}
        >
          <TableCell className="font-semibold">{student.name}</TableCell>
          <TableCell className="font-semibold">
            {student.registration}
          </TableCell>
          <TableCell className="text-center font-semibold">
            {student.certificate.publication_date}
          </TableCell>
          <TableCell className="text-center font-semibold">
            {student.certificate.publication_page}
          </TableCell>
          <TableCell className="text-center  font-semibold">
            {student.certificate.certificate_number}
          </TableCell>
          <TableCell className="text-center font-semibold">
            {student.certificate.second_issue}
          </TableCell>
          <TableCell className="text-center font-semibold">
            {student.certificate.book}
          </TableCell>
          <TableCell className="text-center font-semibold">
            {student.certificate.book_page}
          </TableCell>
          <TableCell className="text-center font-semibold">
            {student.certificate.enrollment_start}
          </TableCell>
          <TableCell className="text-center font-semibold">
            {student.certificate.enrollment_end}
          </TableCell>
          <TableCell className="font-semibold">
            {student.certificate.process_number}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
