/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
import { generic2rand as rand, floor, mix } from './utils';
/**
 * @memberof Unpleasant
 * @description
 * Generic 2 Noise
 * @see {@link https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83|GLSL Noise}
 * @param {Number} x
 * @param {Number} y
 * @returns {Number}
 */
const generic2 = (x, y) => {
  const ix = floor(x);
  const iy = floor(y);

  let ux = x % 1;
  let uy = y % 1;

  ux = ux * ux * (3.0 - 2.0 * ux);
  uy = uy * uy * (3.0 - 2.0 * uy);

  const a = mix(rand(ix, iy), rand(ix + 1.0, iy), ux);
  const b = mix(rand(ix, iy + 1.0), rand(ix + 1.0, iy + 1.0), ux);

  const res = mix(a, b, uy);
  return res * res;
};
export default generic2;
