"use client";

import { FormEvent, useEffect, useState } from "react";
import * as useWrite from "@/hooks/useContractWriteForm";
import styles from "@/styles/components/forms/admin-forms.module.css";
import GreyButton from "@/components/buttons/Grey";
import { IDisputeForm } from "@/interfaces/forms.interface";
import { pinFileToIPFS, pinJSONToIPFS } from "@/utils/blockchain/loadToPinata";

export const SetDisputePointForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetDisputePoint(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value as string;
    }
    setFormData(formValues);
  };

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Set Dispute Point</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input
            type="number"
            name="groupIndex"
            defaultValue={
              dispute?.groupIndex && Number(dispute?.groupIndex) - 1
            }
            placeholder="Group Index"
            required
          />
          <input type="text" name="point" placeholder="Point" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const SetStatusDisputeForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useSetStatusDispute(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value as string;
    }
    setFormData(formValues);
  };

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Set Status Dispute</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input
            type="number"
            name="groupIndex"
            defaultValue={
              dispute?.groupIndex && Number(dispute?.groupIndex) - 1
            }
            placeholder="Group Index"
            required
          />
          <input type="number" name="status" placeholder="Status" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const SetIsHotDisputeForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string | boolean }>(
    {}
  );
  const { write } = useWrite.useSetIsHotDispute(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string | boolean } = {};

    for (const [key, value] of formData.entries()) {
      if (key === "isHot") {
        formValues[key] =
          value === "false"
            ? false
            : value === "true"
            ? true
            : (value as string);
      } else {
        formValues[key] = value as string;
      }
    }
    setFormData(formValues);
  };

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Set Is Hot Dispute</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input
            type="number"
            name="groupIndex"
            defaultValue={
              dispute?.groupIndex && Number(dispute?.groupIndex) - 1
            }
            placeholder="Group Index"
            required
          />
          <input type="text" name="isHot" placeholder="Is Hot" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const CreateDisputeForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useCreateDispute(formData);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      if (
        key.includes("image") ||
        key === "preview"
      ) {
        const file = value as File;
        const ipfsHash = await pinFileToIPFS(file);
        formValues[key] = `https://ipfs.io/ipfs/${ipfsHash}` as string;
      } else {
        formValues[key] = value as string;
      }
    }
    
      const metadata = {
        preview: formValues["preview"],
        point: formValues["point"],
        answer_data: [
          {
            id: 0,
            answer: formValues["answer1"],
            image: formValues["image1"]
          },
          {
            id: 1,
            answer: formValues["answer2"],
            image: formValues["image2"]
          },
          {
            id: 2,
            answer: formValues["answer3"],
            image: formValues["image3"]
          }
        ]
      }

      const metadataURI = await pinJSONToIPFS(metadata);

      const newForm: { [key: string]: string } = {
        groupId: formValues["groupId"] as string,
        needQtyMembers: formValues["quantityMembers"] as string,
        qtyAnswers: "3",
        uriString: `https://ipfs.io/ipfs/${metadataURI!}`
      }

    setFormData(newForm);
  };

  
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Create Dispute</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input type="file" name="preview" placeholder="Preview" required />
          <input type="text" name="point" placeholder="Point" required />
          <input
            type="number"
            name="quantityMembers"
            placeholder="Quantity Members"
            required
          />
          <input type="text" name="answer1" placeholder="Answer 1" required />
          <input
            type="file"
            accept="image/*"
            name="image1"
            placeholder="Image 1"
            required
          />
          <input type="text" name="answer2" placeholder="Answer 2" required />
          <input
            type="file"
            accept="image/*"
            name="image2"
            placeholder="Image 2"
            required
          />
          <input type="text" name="answer3" placeholder="Answer 3" required />
          <input
            type="file"
            accept="image/*"
            name="image3"
            placeholder="Image 3"
            required
          />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};

export const UpdateUriForDisputeForm = ({ dispute }: IDisputeForm) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { write } = useWrite.useUpdateUriForDispute(formData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value as string;
    }
    setFormData(formValues);
  };

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      write();
    }
  }, [formData]);

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <h2 className="purple_color">Update Uri For Dispute</h2>
        <form className={styles.form__container__form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="groupId"
            defaultValue={dispute?.groupId}
            placeholder="Group ID"
            required
          />
          <input
            type="number"
            name="groupIndex"
            defaultValue={
              dispute?.groupIndex && Number(dispute?.groupIndex) - 1
            }
            placeholder="Group Index"
            required
          />
          <input type="text" name="newURI" placeholder="New URI" required />
          <GreyButton type="submit" title="Submit" />
        </form>
      </div>
    </div>
  );
};
