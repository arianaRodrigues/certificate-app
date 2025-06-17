import SubHeader, {
  SubHeaderLeft,
  SubHeaderRight,
  SubHeaderTitle,
} from "./_components/sub-header";
import { TableCertificate } from "./_components/table-certificate";
import { Button } from "./_components/ui/button";
import { Download } from "lucide-react";
import { getAllStudentsData } from "./_services/student.service";
import { ButtonAddFile } from "./_components/button-add-file";
import { ButtonsMenu } from "./_components/buttons-menu";

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
