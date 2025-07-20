#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

const testCommands = {
  'unit': 'npx jest --testPathPattern="src/__tests__/(components|utils)"',
  'integration': 'npx jest --testPathPattern="src/__tests__/integration"',
  'performance': 'npx jest --testPathPattern="src/__tests__/performance"',
  'accessibility': 'npx jest --testPathPattern="src/__tests__/accessibility"',
  'e2e': 'npx cypress run',
  'e2e:open': 'npx cypress open',
  'coverage': 'npx jest --coverage',
  'watch': 'npx jest --watch',
  'all': 'npx jest',
  'basic': 'npx jest --testPathPattern="basic.test.ts"'
};

function runCommand(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  try {
    switch (command) {
      case 'unit':
      case 'integration':
      case 'performance':
      case 'accessibility':
      case 'e2e':
      case 'e2e:open':
      case 'coverage':
      case 'watch':
      case 'all':
      case 'basic':
        console.log(`Running ${command} tests...`);
        const [cmd, ...cmdArgs] = testCommands[command].split(' ');
        await runCommand(cmd, cmdArgs);
        break;
      
      case 'help':
        console.log(`
Available test commands:
  unit          - Run unit tests (components & utils)
  integration   - Run integration tests
  performance   - Run performance tests
  accessibility - Run accessibility tests
  e2e           - Run E2E tests with Cypress
  e2e:open      - Open Cypress UI
  coverage      - Run tests with coverage report
  watch         - Run tests in watch mode
  all           - Run all tests
  basic         - Run basic setup tests
  help          - Show this help message

Usage: node scripts/run-tests.js <command>
        `);
        break;
      
      default:
        console.log('Unknown command. Use "help" to see available commands.');
        process.exit(1);
    }
  } catch (error) {
    console.error('Test execution failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runCommand, testCommands }; 