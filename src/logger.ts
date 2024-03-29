import { createLogger, format, transports } from 'winston'
import colors from 'colors'
const { combine, timestamp, printf } = format

const colorLogLevelMap: Record<string, colors.Color> = {
    INFO: colors.green,
    WARN: colors.yellow,
    ERROR: colors.red,
}

export const getLogger = (loggerName = '') => {
    const logFormat = printf(({ level, message, timestamp }) => {
        const upperCaseLevel = level.toUpperCase()
        const levelWithColor = (
            colorLogLevelMap[upperCaseLevel] || colors.gray
        )(upperCaseLevel + ':')

        return `${loggerName} ${levelWithColor} ${colors.gray(
            timestamp,
        )} ${message}`
    })

    return createLogger({
        format: combine(timestamp(), logFormat),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'logfile.log' }),
        ],
    })
}
