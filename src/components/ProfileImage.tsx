import { useState } from 'react';

export const ProfileImage = () => {
  const [available, setAvailable] = useState(true);
  return (
    <div className="portrait-frame">
      {available ? (
        <img className="portrait" src="/perfil.jpg" alt="Ismael Reyes Pérez"
          loading="lazy" width="320" height="380" onError={() => setAvailable(false)} />
      ) : (
        <div className="portrait initials" role="img" aria-label="Iniciales de Ismael Reyes Pérez">IR</div>
      )}
    </div>
  );
};
