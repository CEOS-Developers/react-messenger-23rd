import PageHeader from "@/components/common/PageHeader";
import EditIcon from "@/assets/pageheader_edit.svg?react";
import More_Square from "@/assets/pageheader_moresquare.svg?react";

export default function Profile() {
  return (
    <div>
      {" "}
      <PageHeader
        title="친구"
        right={
          <>
            <EditIcon />
            <More_Square />
          </>
        }
      />
    </div>
  );
}
