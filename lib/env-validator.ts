/**
 * Environment variable validator for ComCelo
 * Ensures required and optional env vars are properly configured
 * Runs on app startup to catch configuration issues early
 */

interface EnvVarDefinition {
  readonly name: string;
  readonly description: string;
  readonly required: boolean;
  readonly validator?: (value: string) => boolean;
  readonly default?: string;
  readonly example?: string;
}

// ============ Environment Variable Definitions ============

const ENV_DEFINITIONS: EnvVarDefinition[] = [
  // Deployment Configuration
  {
    name: 'DEPLOYER_KEY',
    description: 'Private key for contract deployment',
    required: process.env.NODE_ENV !== 'development',
    example: 'your_private_key_here',
  },

  // Celo Network Configuration
  {
    name: 'CELO_RPC_ALFAJORES',
    description: 'Celo Alfajores testnet RPC URL',
    required: false,
    default: 'https://alfajores-forno.celo-testnet.org',
    validator: (value) => value.startsWith('https://'),
  },
  {
    name: 'CELO_RPC_MAINNET',
    description: 'Celo Mainnet RPC URL',
    required: false,
    default: 'https://forno.celo.org',
    validator: (value) => value.startsWith('https://'),
  },
  {
    name: 'CELOSCAN_API_KEY',
    description: 'Celoscan API key for contract verification',
    required: false,
    example: 'your_celoscan_api_key_here',
  },

  // Base Network Configuration
  {
    name: 'BASE_RPC_SEPOLIA',
    description: 'Base Sepolia testnet RPC URL',
    required: false,
    default: 'https://sepolia.base.org',
    validator: (value) => value.startsWith('https://'),
  },
  {
    name: 'BASE_RPC_MAINNET',
    description: 'Base Mainnet RPC URL',
    required: false,
    default: 'https://mainnet.base.org',
    validator: (value) => value.startsWith('https://'),
  },
  {
    name: 'BASESCAN_API_KEY',
    description: 'Basescan API key for contract verification',
    required: false,
    example: 'your_basescan_api_key_here',
  },

  // Frontend Configuration
  {
    name: 'NEXT_PUBLIC_BASE_URL',
    description: 'Frontend base URL',
    required: false,
    default: 'http://localhost:3000',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
  },
  {
    name: 'NEXT_PUBLIC_NETWORK_ID',
    description: 'Active network ID (celoAlfajores, celo, baseSepolia, base)',
    required: false,
    default: 'baseSepolia',
    validator: (value) =>
      ['celoAlfajores', 'celo', 'baseSepolia', 'base', 'stacksTestnet', 'stacksMainnet'].includes(value),
  },
  {
    name: 'NEXT_PUBLIC_WC_PROJECT_ID',
    description: 'WalletConnect project ID',
    required: false,
    example: 'your_walletconnect_project_id_here',
  },

  // Core Game Contracts
  {
    name: 'NEXT_PUBLIC_GAME_CONTRACT_ADDRESS',
    description: 'ComCeloCore contract address',
    required: false,
    default: '0x0000000000000000000000000000000000000000',
    validator: isValidEvmAddress,
  },
  {
    name: 'NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS',
    description: 'ComCeloMatchmaker contract address',
    required: false,
    default: '0x0000000000000000000000000000000000000000',
    validator: isValidEvmAddress,
  },
  {
    name: 'NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS',
    description: 'ComCeloTreasury contract address',
    required: false,
    default: '0x0000000000000000000000000000000000000000',
    validator: isValidEvmAddress,
  },
  {
    name: 'NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS',
    description: 'ComCeloGovernance contract address',
    required: false,
    default: '0x0000000000000000000000000000000000000000',
    validator: isValidEvmAddress,
  },

  // Feature Contracts
  {
    name: 'NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS',
    description: 'ComCeloItems contract address',
    required: false,
    default: '0x0000000000000000000000000000000000000000',
    validator: isValidEvmAddress,
  },
  {
    name: 'NEXT_PUBLIC_META_TX_RELAY_CONTRACT_ADDRESS',
    description: 'ComCeloMetaTxRelay contract address',
    required: false,
    default: '0x0000000000000000000000000000000000000000',
    validator: isValidEvmAddress,
  },

  // Stacks Configuration
  {
    name: 'STACKS_PRIVATE_KEY',
    description: 'Stacks private key for deployment',
    required: false,
    example: 'your_stacks_private_key_here',
  },
  {
    name: 'STACKS_NETWORK',
    description: 'Stacks network (mainnet or testnet)',
    required: false,
    default: 'testnet',
    validator: (value) => ['mainnet', 'testnet'].includes(value),
  },
  {
    name: 'STACKS_CONTRACT_NAME',
    description: 'Stacks contract name',
    required: false,
    default: 'comcelo',
  },

  // Relayer Configuration
  {
    name: 'RELAYER_PRIVATE_KEY',
    description: 'Private key for relayer service',
    required: false,
    example: 'your_relayer_private_key_here',
  },
  {
    name: 'RELAYER_PORT',
    description: 'Relayer service port',
    required: false,
    default: '3001',
    validator: (value) => !isNaN(Number(value)) && Number(value) > 0,
  },
  {
    name: 'RELAYER_MAX_GAS_PRICE',
    description: 'Maximum gas price in Gwei for relayer',
    required: false,
    default: '100',
    validator: (value) => !isNaN(Number(value)) && Number(value) > 0,
  },

  // Farcaster Configuration
  {
    name: 'NEXT_PUBLIC_FRAME_URL',
    description: 'Farcaster frame URL',
    required: false,
    example: 'https://comcelo.vercel.app',
    validator: (value) => value.startsWith('https://'),
  },
  {
    name: 'NEXT_PUBLIC_FARCASTER_HUB_URL',
    description: 'Farcaster hub URL',
    required: false,
    default: 'https://hub.pinata.cloud',
  },
];

// ============ Validators ============

function isValidEvmAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

// ============ Validation Engine ============

export interface ValidationIssue {
  readonly varName: string;
  readonly message: string;
  readonly severity: 'error' | 'warning';
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly issues: ValidationIssue[];
}

/**
 * Validate all environment variables
 */
export function validateEnvironment(): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const envDef of ENV_DEFINITIONS) {
    const value = process.env[envDef.name];

    // Check if required
    if (envDef.required && !value) {
      issues.push({
        varName: envDef.name,
        message: `${envDef.description} is required but not set`,
        severity: 'error',
      });
      continue;
    }

    // Use default if not set
    if (!value && envDef.default) {
      process.env[envDef.name] = envDef.default;
      continue;
    }

    // Validate value format if provided
    if (value && envDef.validator && !envDef.validator(value)) {
      issues.push({
        varName: envDef.name,
        message: `${envDef.description} has invalid format: "${value}"`,
        severity: 'warning',
      });
    }
  }

  return {
    isValid: issues.filter((i) => i.severity === 'error').length === 0,
    issues,
  };
}

/**
 * Assert that environment is valid, throw if not
 */
export function assertValidEnvironment(): void {
  const result = validateEnvironment();

  const errors = result.issues.filter((i) => i.severity === 'error');
  const warnings = result.issues.filter((i) => i.severity === 'warning');

  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:');
    warnings.forEach((warning) => {
      console.warn(`  - ${warning.varName}: ${warning.message}`);
    });
  }

  if (!result.isValid) {
    console.error('❌ Environment validation failed:');
    errors.forEach((error) => {
      console.error(`  - ${error.varName}: ${error.message}`);
    });

    const missingVars = errors.map((e) => e.varName).join(', ');
    throw new Error(
      `Missing or invalid required environment variables: ${missingVars}. Check .env.example for required variables.`
    );
  }

  console.log('✅ Environment validation passed');
}

/**
 * Print environment variable documentation
 */
export function printEnvironmentDocumentation(): void {
  console.log('\n📋 ComCelo Environment Variables\n');

  const required = ENV_DEFINITIONS.filter((e) => e.required);
  const optional = ENV_DEFINITIONS.filter((e) => !e.required);

  if (required.length > 0) {
    console.log('REQUIRED:');
    required.forEach((def) => {
      console.log(`  ${def.name}`);
      console.log(`    Description: ${def.description}`);
      if (def.example) {
        console.log(`    Example: ${def.example}`);
      }
    });
  }

  if (optional.length > 0) {
    console.log('\nOPTIONAL:');
    optional.forEach((def) => {
      console.log(`  ${def.name}`);
      console.log(`    Description: ${def.description}`);
      if (def.default) {
        console.log(`    Default: ${def.default}`);
      }
      if (def.example) {
        console.log(`    Example: ${def.example}`);
      }
    });
  }

  console.log('\n');
}

/**
 * Generate .env file from template
 */
export function generateEnvTemplate(): string {
  const lines = ENV_DEFINITIONS.map((def) => {
    const value = def.default || def.example || 'your_value_here';
    return `${def.name}=${value}`;
  });

  return lines.join('\n');
}

// ============ Initialization ============

/**
 * Initialize environment validation
 * Call this early in your application setup
 */
export function initializeEnvironment(): void {
  if (process.env.NODE_ENV !== 'test') {
    assertValidEnvironment();
  }
}
