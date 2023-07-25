import {useEffect} from 'react';
import {Header, Segment, Comment, Loader} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Formik, Form, Field, FieldProps} from "formik";
import * as Yup from "yup"
import { formatDistanceToNow } from 'date-fns';

interface Props {
    eventId: string | undefined
}

export default observer(function EventDetailsChat({eventId} : Props) {
    const {eventStore,commentStore} = useStore()

    useEffect(() => {
        if (eventId){
            commentStore.createHubConnection(eventId)
        }
        return ()=>{
            commentStore.disconect()
        }
    }, [commentStore,eventId]);


    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none',width: 800}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached className="ui segment eventDetailsChat" >
                <Comment.Group>
                    {commentStore.comments.map(comment=>(
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.avatar}/>
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.username}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{whiteSpace:'pre-wrap'}}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <Formik onSubmit={(values,{resetForm})=>
                        commentStore.addComment(values).then(()=>resetForm())}
                            initialValues={{message: ''}}
                            validationSchema={Yup.object({
                                message: Yup.string().required()
                            })}
                    >
                        {({isSubmitting,isValid,handleSubmit})=>(
                        <Form className={'ui form'}>
                            <Field name={'message'}>
                                {(props: FieldProps)=>(
                                    <div style={{position:"relative"}}>
                                        <Loader active={isSubmitting}/>
                                        <textarea
                                            rows={2}
                                            placeholder={'press enter to send / press enter+shift to create new line'}
                                                  {...props.field}
                                            onKeyDown={e=>{
                                                if (e.key === "Enter" && e.shiftKey){
                                                    return
                                            }
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault()
                                                    isValid && handleSubmit()
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                            )}
                    </Formik>
                </Comment.Group>
            </Segment>
        </>
    );
})

