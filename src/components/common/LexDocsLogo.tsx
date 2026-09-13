import React from 'react';

interface LexDocsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'badge';
  dark?: boolean;
}

export const LexDocsLogo: React.FC<LexDocsLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  dark = false,
}) => {
  // Cores institucionais fiéis ao logotipo da imagem 1
  const navyColor = dark ? '#ffffff' : '#0e1f3d';
  const goldColor = '#c19a4e';
  const accentNavy = '#142952';

  if (variant === 'icon') {
    return (
      <div
        className={`flex items-center justify-center flex-shrink-0 relative ${
          size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'
        } ${className}`}
        title="LexDocs Assessoria Documental"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Folha de documento com dobra superior direita */}
          <path
            d="M32 18H62L76 32V80H32V18Z"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Dobra da folha */}
          <path
            d="M62 18V32H76"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Linhas de texto douradas no documento */}
          <path
            d="M42 28H54M42 36H66M42 44H66"
            stroke={goldColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Letra L Serifada em Azul Marinho */}
          <text
            x="14"
            y="76"
            fontFamily="'Playfair Display', 'Cinzel', 'Times New Roman', serif"
            fontSize="54"
            fontWeight="bold"
            fill={dark ? '#ffffff' : '#0e1f3d'}
          >
            L
          </text>

          {/* Letra D Estilizada em Dourado Ocre */}
          <text
            x="36"
            y="75"
            fontFamily="'Playfair Display', 'Cinzel', 'Times New Roman', serif"
            fontSize="50"
            fontWeight="bold"
            fill={goldColor}
          >
            D
          </text>

          {/* Lupa examinadora no canto inferior direito */}
          <circle
            cx="70"
            cy="70"
            r="14"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="3.5"
            fill={dark ? '#0d1c32' : '#ffffff'}
          />
          {/* Linhas dentro da lupa */}
          <path
            d="M63 68H77M63 73H77"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Cabo da lupa */}
          <path
            d="M80 80L92 92"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Variant Full: Ícone + Tipografia Completa "LexDocs" e "ASSESSORIA DOCUMENTAL"
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Símbolo do Logotipo */}
      <div
        className={`flex-shrink-0 ${
          size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Folha de documento */}
          <path
            d="M32 16H64L78 30V78H32V16Z"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Dobra da folha */}
          <path
            d="M64 16V30H78"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Linhas de texto douradas no documento */}
          <path
            d="M44 26H56M44 34H68M44 42H68"
            stroke={goldColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Letra L Serifada Azul Marinho */}
          <text
            x="14"
            y="76"
            fontFamily="'Playfair Display', 'Cinzel', 'Times New Roman', Georgia, serif"
            fontSize="54"
            fontWeight="bold"
            fill={dark ? '#ffffff' : '#0e1f3d'}
          >
            L
          </text>

          {/* Letra D Estilizada Dourada */}
          <text
            x="36"
            y="75"
            fontFamily="'Playfair Display', 'Cinzel', 'Times New Roman', Georgia, serif"
            fontSize="50"
            fontWeight="bold"
            fill={goldColor}
          >
            D
          </text>

          {/* Lupa examinadora no canto inferior */}
          <circle
            cx="70"
            cy="70"
            r="14"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="3.8"
            fill={dark ? '#0d1c32' : '#ffffff'}
          />
          <path
            d="M63 68H77M63 73H77"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M80 80L93 93"
            stroke={dark ? '#ffffff' : '#0e1f3d'}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Tipografia da Marca Exata da Imagem 1 */}
      <div className="flex flex-col select-none">
        <div className="flex items-baseline leading-none">
          <span
            className="font-['Playfair_Display',_Georgia,_serif] font-bold tracking-tight"
            style={{
              color: navyColor,
              fontSize: size === 'sm' ? '18px' : size === 'lg' ? '30px' : '23px',
              letterSpacing: '-0.02em',
            }}
          >
            Lex
          </span>
          <span
            className="font-['Playfair_Display',_Georgia,_serif] font-bold tracking-tight"
            style={{
              color: goldColor,
              fontSize: size === 'sm' ? '18px' : size === 'lg' ? '30px' : '23px',
              letterSpacing: '-0.02em',
            }}
          >
            Docs
          </span>
        </div>

        {/* Linha com — ASSESSORIA DOCUMENTAL — */}
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="h-[1px] w-2.5 sm:w-3"
            style={{ backgroundColor: dark ? 'rgba(255,255,255,0.4)' : '#0e1f3d' }}
          />
          <span
            className="font-['Plus_Jakarta_Sans',_sans-serif] font-bold tracking-[0.14em] uppercase"
            style={{
              color: dark ? 'rgba(255,255,255,0.85)' : accentNavy,
              fontSize: size === 'sm' ? '8.5px' : size === 'lg' ? '12px' : '9.5px',
            }}
          >
            Assessoria Documental
          </span>
          <span
            className="h-[1px] w-2.5 sm:w-3"
            style={{ backgroundColor: dark ? 'rgba(255,255,255,0.4)' : '#0e1f3d' }}
          />
        </div>

        {size === 'lg' && (
          <span
            className="font-['Inter'] text-[11px] mt-1 text-[#44474d]"
            style={{ color: dark ? 'rgba(255,255,255,0.65)' : '#44474d' }}
          >
            Análise e organização de documentos para registros civis.
          </span>
        )}
      </div>
    </div>
  );
};
