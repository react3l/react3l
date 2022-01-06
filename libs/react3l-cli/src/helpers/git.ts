import {execSync} from 'child_process';
import type {GitCredentials} from '../GitCredentials';

export function getGitCredentials(): GitCredentials {
  const name: string = execSync('git config user.name', {
    encoding: 'utf-8',
  }).trim();
  const email: string = execSync('git config user.email', {
    encoding: 'utf-8',
  }).trim();
  return {
    name,
    email,
  };
}
