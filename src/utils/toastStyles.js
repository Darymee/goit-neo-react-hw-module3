const toastBase = {
  borderRadius: '14px',
  padding: '12px 14px',
  background: 'rgba(11, 18, 32, 0.92)',
  color: 'rgba(234, 240, 255, 0.95)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  boxShadow: '0 14px 34px rgba(0, 0, 0, 0.45)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  fontWeight: 700,
  fontSize: '13px',
  lineHeight: 1.25,
};

export const toastErrorStyles = {
  ...toastBase,
  border: '1px solid rgba(255, 122, 122, 0.22)',
  boxShadow: '0 14px 34px rgba(255, 122, 122, 0.10)',
};

export const toastSuccessStyles = {
  ...toastBase,
  border: '1px solid rgba(103, 242, 198, 0.22)',
  boxShadow: '0 14px 34px rgba(103, 242, 198, 0.10)',
};
