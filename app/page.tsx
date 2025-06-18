import SubHeader from "./_components/sub-header";
import { TableCertificate } from "./_components/table-certificate";
import { ButtonsMenu } from "./_components/buttons-menu";
import { getAllStudentsData } from "./_actions/student.action";

export default async function Home() {
  const students = await getAllStudentsData();

  return (
    <div className="w-full space-y-5 p-6">
      <SubHeader>
        <ButtonsMenu />
      </SubHeader>

      <TableCertificate students={students} />
    </div>
  );
}
