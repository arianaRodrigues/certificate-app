import { TableCertificateContent } from "./table-certificate-content";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

type TableCertificateProps = {
  students: StudentType[];
};

export const TableCertificate = ({ students }: TableCertificateProps) => {
  return (
    <div className="pt-7">
      <Table className="rounded-lg">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead
              className="font-semibold text-center border border-gray-300"
              rowSpan={2}
            >
              Nome do Aluno
            </TableHead>
            <TableHead
              className="font-semibold text-center border border-gray-300"
              rowSpan={2}
            >
              Matrícula
            </TableHead>
            <TableHead
              className="font-semibold text-center border border-gray-300"
              colSpan={2}
            >
              Diário Oficial
            </TableHead>
            <TableHead
              className="font-semibold text-center border border-gray-300"
              colSpan={2}
            >
              Número
            </TableHead>
            <TableHead
              className="font-semibold text-center border border-gray-300"
              colSpan={2}
            >
              CECIERJ/CEJA
            </TableHead>
            <TableHead
              className="font-semibold text-center border border-gray-300"
              colSpan={2}
            >
              DATAS - MATRÍCULAS
            </TableHead>
            <TableHead
              className="font-semibold text-center border border-gray-300"
              rowSpan={2}
            >
              Nº DO PROCESSO
            </TableHead>
          </TableRow>

          <TableRow className="bg-gray-200">
            <TableHead className="font-semibold text-center border border-gray-300">
              Data
            </TableHead>
            <TableHead className="font-semibold text-center border border-gray-300">
              Página
            </TableHead>
            <TableHead className="font-semibold text-center border border-gray-300">
              1ª Via
            </TableHead>
            <TableHead className="font-semibold text-center border border-gray-300">
              2ª Via
            </TableHead>
            <TableHead className="font-semibold text-center border border-gray-300">
              Livro
            </TableHead>
            <TableHead className="font-semibold text-center border border-gray-300">
              Página
            </TableHead>
            <TableHead className="font-semibold text-center border border-gray-300">
              Inicio
            </TableHead>
            <TableHead className="font-semibold text-center border border-gray-300">
              Término
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableCertificateContent students={students} />
      </Table>
    </div>
  );
};
