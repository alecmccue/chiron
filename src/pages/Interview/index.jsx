
const Interview = () => {
    return (
        <div>

        </div>
//         <>
//             <Box sx={{ display: 'flex', width: '100%' }}>
//         <Box
//             sx={{
//                 maxWidth: '80%',
//                 maxHeight: '80.98px',
//                 display: 'flex',
//                 flexDirection: 'column-reverse',
//             }}
//         >
//             <Box
//                 height={5}
//                 mb={4}
//                 mt={2}
//                 width='6rem'
//                 bgcolor='primary.main'
//                 borderRadius={1}
//             >
//                 &#8203;
//             </Box>
//             <Typography variant='h2'>
//                 <TextTransition className='transition'>
//                     {questionDisplay}
//                 </TextTransition>
//             </Typography>
//         </Box>
//         <Box
//             sx={{
//                 marginLeft: 'auto',
//                 bgcolor: '#E6F3ED',
//                 borderRadius: '0.5rem',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '3rem',
//                 width: '10.45rem',
//             }}
//         >
//             <Typography
//                 sx={{
//                     color: '#8FC0A9',
//                     fontWeight: 700,
//                 }}
//             >
//                 {questions.length - questionsAnswered}{' '}
//                 {questions.length - questionsAnswered == 1
//                     ? 'question'
//                     : 'questions'}{' '}
//                 left
//             </Typography>
//         </Box>
//     </Box>
//
//     <Grid container spacing={3}>
//         <Grid item xs={4} sx={{ position: 'relative' }}>
//             <Box
//                 sx={{
//                     height: '100%',
//                     width: '100%',
//                     bgcolor: '#E1E1E1',
//                     borderRadius: '1.25rem',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 <Player
//                     loop
//                     src='/Interviewer.json'
//                     style={{ width: '25rem' }}
//                     ref={interviewerPlayer}
//                     speed={1.25}
//                 ></Player>
//             </Box>
//             <Chip
//                 icon={
//                     <PersonIcon sx={{ '&.MuiChip-icon': { color: '#FFFFFF8A' } }} />
//                 }
//                 label='Chandler Bing'
//                 sx={{
//                     position: 'absolute',
//                     zIndex: 5,
//                     bottom: '1rem',
//                     left: '2.5rem',
//                     backgroundColor: '#00000052',
//                     color: '#FFFFFFA1',
//                     fontWeight: 700,
//                 }}
//             ></Chip>
//         </Grid>
//         <Grid item xs={8} sx={{ position: 'relative' }}>
//             <Chip
//                 icon={
//                     <GraphicEqRoundedIcon
//                         sx={{ '&.MuiChip-icon': { color: '#AF6161 !important' } }}
//                     />
//                 }
//                 label='Please wait for the interviewer to finish speaking'
//                 sx={{
//                     position: 'absolute',
//                     zIndex: 5,
//                     top: '2.5rem',
//                     right: '1rem',
//                     backgroundColor: '#FB2D2D54',
//                     transition: '0.5s',
//                     opacity: interviewerTalking ? '100%' : '0%',
//                 }}
//             ></Chip>
//             <Chip
//                 icon={
//                     <GraphicEqRoundedIcon
//                         sx={{ '&.MuiChip-icon': { color: '#799D8C !important' } }}
//                     />
//                 }
//                 label='You may answer the question now'
//                 sx={{
//                     position: 'absolute',
//                     zIndex: 5,
//                     top: '2.5rem',
//                     right: '1rem',
//                     backgroundColor: '#28C17B4D',
//                     transition: '0.5s',
//                     opacity: isRecording ? '100%' : '0%',
//                 }}
//             ></Chip>
//             <Chip
//                 icon={
//                     <PersonIcon sx={{ '&.MuiChip-icon': { color: '#FFFFFF8A' } }} />
//                 }
//                 label={userDetails.name}
//                 sx={{
//                     position: 'absolute',
//                     zIndex: 5,
//                     bottom: '1rem',
//                     left: '2.5rem',
//                     backgroundColor: '#00000052',
//                     color: '#FFFFFFA1',
//                     fontWeight: 700,
//                 }}
//             ></Chip>
//
//             <WebCamera />
//         </Grid>
//     </Grid>
//     <Box
//         sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             width: '100%',
//         }}
//     >
//         <Box width='18rem'></Box>
//         <Image src={'controls.svg'} width={350} height={120} alt='controls' />
//         {/*<Box mt={4}>*/}
//         {/*    <Button*/}
//         {/*        variant='error'*/}
//         {/*        disabled={isRecording ? false : true}*/}
//         {/*        startIcon={<ReplayIcon />}*/}
//         {/*        onClick={redoQuestion}*/}
//         {/*    >*/}
//         {/*        Redo*/}
//         {/*    </Button>*/}
//         {/*    <Button*/}
//         {/*        disabled={isRecording || interviewComplete ? false : true}*/}
//         {/*        variant='outlined'*/}
//         {/*        onClick={*/}
//         {/*            interviewComplete ? () => router.push('/feedback') : stopRecording*/}
//         {/*        }*/}
//         {/*        endIcon={*/}
//         {/*            questionsAnswered == questions.length ? null : <ArrowForward />*/}
//         {/*        }*/}
//         {/*        startIcon={*/}
//         {/*            questionsAnswered == questions.length ? (*/}
//         {/*                <CallEndRoundedIcon />*/}
//         {/*            ) : null*/}
//         {/*        }*/}
//         {/*        sx={{ padding: '.5rem 1.5rem', boxShadow: 'none', ml: 2 }}*/}
//         {/*    >*/}
//         {/*        {questionsAnswered == questions.length*/}
//         {/*            ? 'End Interview'*/}
//         {/*            : 'Submit Answer'}*/}
//         {/*    </Button>*/}
//         {/*</Box>*/}
//     </Box>
// </>
    )
}


export default Interview