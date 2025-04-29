export {};
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-flow',
    '@babel/preset-typescript'
  ],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties'
  ],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};
