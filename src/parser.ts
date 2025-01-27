import { Transform } from 'node:stream'

type Options = {
  delimiter: string
}

export function parser(options?: Partial<Options>) {
  const { delimiter } = options ?? { delimiter: ';' }

  return new Transform({
    transform(chunk: Buffer, encoding, callback) {
      const [header, ...columns] = chunk.toString().trim().split('\n')
      const headers = header.split(delimiter as string)

      const data = columns.map((column) =>
        headers.reduce(
          (obj, header, index) => ({
            ...obj,
            [header]: column.split(delimiter as string)[index]
          }),
          {}
        )
      )

      callback(null, JSON.stringify(data))
    }
  })
}
