"use client";

import Custom404 from "@/app/not-found";
import MasterForm from "@/components/forms/admin/MasterForm";
import { useIsAdmin } from "@/hooks/useContractData";
import styles from "@/styles/components/screens/admin/admin.module.css";
import { useAccount } from "wagmi";

export default function Admin() {
  const { address } = useAccount();
  const isAdmin = useIsAdmin(address);

  // return !isAdmin ? (
  //   <Custom404 />
  // ) : (
  // );
  return (
    <div className={styles.admin}>
      <div className={styles.admin__container}>
        <MasterForm />
      </div>
    </div>
  );
}
