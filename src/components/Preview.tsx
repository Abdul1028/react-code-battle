import React from 'react';
import * as Babel from '@babel/standalone';

interface PreviewProps {
  code: string;
}

export function Preview({ code }: PreviewProps) {
  try {
    const transformedCode = Babel.transform(code, {
      presets: ['react'],
    }).code;

    const Component = new Function('React', 'useState', `
      ${transformedCode}
      return Challenge;
    `)(React, React.useState);

    return (
      <div className="text-gray-900">
        <Component />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500 p-4">
        {error.message}
      </div>
    );
  }
}