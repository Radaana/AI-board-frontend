import { useRef, useState } from 'react';
import { useCreateDialogMutation } from '../data/dialog.ts';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input } from 'antd';

export function DialogForm() {
    const [createDialog, result] = useCreateDialogMutation();

    const [text, setText] = useState('');
    const uuidRef = useRef(uuidv4());

    const handleCreate = async () => {
        try {
            await createDialog({
                text: text.trim(),
                clientRequestId: uuidRef.current,
            }).unwrap();
            setText('');
            uuidRef.current = uuidv4();
        } catch {}
    };

    const onSend = () => {
        if (result.isLoading || !text.trim()) return;
        return handleCreate();
    };

    const onResolveConflict = () => {
        if (result.isLoading || !text.trim()) return;
        uuidRef.current = uuidv4();
        return handleCreate();
    };

    const hasConflict = result.error !== undefined && 'status' in result.error && result.error.status === 409;
    const disableActions = result.isLoading || !text.trim();

    return (
        <div className="space-y-3">
            <div className="flex w-full items-end gap-2">
                <Input.TextArea
                    className="min-w-0 flex-1"
                    value={text}
                    disabled={result.isLoading}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type your first message"
                    aria-label="First message"
                    autoSize={{ minRows: 3, maxRows: 8 }}
                />
                <Button
                    className="shrink-0"
                    type="primary"
                    onClick={onSend}
                    disabled={disableActions}
                    loading={result.isLoading}
                >
                    Send
                </Button>
            </div>
            {result.isLoading && <div className="text-sm text-muted dark:text-muted-dark">Loading...</div>}
            {result.isError && !hasConflict && (
                <div className="text-sm text-red-600 dark:text-red-400">Error on conversation creation</div>
            )}
            {result.isSuccess && <div className="text-sm text-accent dark:text-brand">Conversation created</div>}
            {hasConflict && (
                <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line p-3 text-sm dark:border-line-dark">
                    <span>
                        Your previous message already created a conversation. You can send this edited message in a new
                        conversation
                    </span>
                    <Button type="primary" onClick={onResolveConflict} disabled={disableActions}>
                        Send in a new conversation
                    </Button>
                </div>
            )}
        </div>
    );
}
