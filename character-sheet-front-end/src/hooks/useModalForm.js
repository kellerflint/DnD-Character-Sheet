import { useState } from "react";

export function useModalForm(initialState, closeModal) {
   const [formData, setFormData] = useState(initialState);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const handleClose = () => {
      setFormData(initialState);
      setError("");
      setSuccess("");
      setIsLoading(false);
      closeModal();
   };

   return {
      formData,
      setFormData,
      error,
      setError,
      success,
      setSuccess,
      isLoading,
      setIsLoading,
      handleClose,
   };
}
