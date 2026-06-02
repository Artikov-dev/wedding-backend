#!/usr/bin/env node

/**
 * API Testing Runner Script
 * 
 * This script helps run the comprehensive API tests and view results.
 * 
 * Usage:
 *   npm run test:api          - Run all tests
 *   npm run test:api:view     - View existing test results
 *   npm run test:api:docs     - Open Swagger UI
 */

import { spawn, exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const PROJECT_ROOT = process.cwd();
const APITEST_FILE = path.join(PROJECT_ROOT, 'docs', 'APITEST.MD');
const TEST_SCRIPT = path.join(PROJECT_ROOT, 'api.test.ts');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkServer() {
  return new Promise<boolean>((resolve) => {
    exec('curl -s http://localhost:3000/api/health', (error) => {
      resolve(!error);
    });
  });
}

async function runTests() {
  log('\n🚀 Starting Wedding Hall Booking API Tests\n', 'cyan');

  // Check if server is running
  log('📡 Checking if server is running...', 'blue');
  const serverRunning = await checkServer();

  if (!serverRunning) {
    log(
      '❌ Server is not running at http://localhost:3000',
      'red'
    );
    log('⚠️  Please start the server first:', 'yellow');
    log('   npm run dev', 'cyan');
    process.exit(1);
  }

  log('✅ Server is running!', 'green');
  log('📋 Running comprehensive API tests...\n', 'blue');

  // Run the test script
  return new Promise<void>((resolve, reject) => {
    const testProcess = spawn('npx', ['ts-node', TEST_SCRIPT], {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
    });

    testProcess.on('close', (code) => {
      if (code === 0) {
        log('\n✨ Tests completed successfully!', 'green');
        log('📄 Check docs/APITEST.MD for detailed results', 'cyan');
        log('🌐 View Swagger UI at: http://localhost:3000/swagger\n', 'cyan');
        resolve();
      } else {
        reject(new Error(`Test script failed with code ${code}`));
      }
    });

    testProcess.on('error', (err) => {
      reject(err);
    });
  });
}

async function viewResults() {
  if (!fs.existsSync(APITEST_FILE)) {
    log('❌ No test results found', 'red');
    log('Run tests first: npm run test:api', 'yellow');
    process.exit(1);
  }

  log('\n📊 API Test Results\n', 'cyan');
  const content = fs.readFileSync(APITEST_FILE, 'utf-8');
  console.log(content);
}

async function openSwagger() {
  const swaggerUrl = 'http://localhost:3000/swagger';
  log(`\n🔗 Opening Swagger UI at ${swaggerUrl}\n`, 'cyan');

  // Try to open browser based on platform
  const commands = {
    win32: `start ${swaggerUrl}`,
    darwin: `open ${swaggerUrl}`,
    linux: `xdg-open ${swaggerUrl}`,
  };

  const platform = os.platform() as keyof typeof commands;
  const command = commands[platform];

  if (command) {
    exec(command, (err) => {
      if (err) {
        log(
          `Could not open browser. Visit manually: ${swaggerUrl}`,
          'yellow'
        );
      }
    });
  } else {
    log(`Visit ${swaggerUrl} in your browser`, 'yellow');
  }
}

async function main() {
  const command = process.argv[2] || 'run';

  try {
    switch (command) {
      case 'run':
        await runTests();
        break;

      case 'view':
        await viewResults();
        break;

      case 'docs':
        await openSwagger();
        break;

      case 'help':
        log('\nAPI Testing Commands:', 'cyan');
        log('  npm run test:api          - Run all API tests', 'blue');
        log('  npm run test:api:view     - View last test results', 'blue');
        log('  npm run test:api:docs     - Open Swagger UI', 'blue');
        log('  npm run test:api:help     - Show this help message\n', 'blue');
        break;

      default:
        log(`Unknown command: ${command}`, 'red');
        log('Run "npm run test:api:help" for available commands', 'yellow');
        process.exit(1);
    }
  } catch (error: any) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();
