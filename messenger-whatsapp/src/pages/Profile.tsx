import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import EditIcon from "@/assets/pageheader_edit.svg?react";
import More_Square from "@/assets/pageheader_moresquare.svg?react";

export default function Profile() {
  const { setHeaderConfig } =
    useOutletContext<{ setHeaderConfig: (c: HeaderConfig) => void }>();

  useEffect(() => {
    setHeaderConfig({
      title: "내 프로필",
      right: (
        <>
          <EditIcon />
          <More_Square />
        </>
      ),
    });
  }, [setHeaderConfig]);

  return <div />;
}
