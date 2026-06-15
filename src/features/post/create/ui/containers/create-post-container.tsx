'use client';
import { CREATE_POST_STEPS, POST_SOURCE } from '../../constants/post.constants';
import { useCreatePostFlow } from '../../hooks/use-create-post-flow';
import { CameraCaptureSheet } from '../components/camera-capture-sheet';
import { MediaPickerSheet } from '../components/media-picker-sheet';
import { MediaPreviewSheet } from '../components/media-preview-sheet';
import { SourceSelectionSheet } from '../components/source-selection-sheet';
import { MediaPreviewForm } from '../forms/media-preview-form';
import { PostDetailsForm } from '../forms/post-details-form';

export const CreatePostContainer = () => {
  const {
    isOpen,
    currentStep,
    // selectedMedia,
    isPublishing,
    handleClose,
    handleStepBack,
    handleSourceSelected,
    handlePreviewConfirmed,
    handlePublish,
    handleSelectSource,
    handleRetake,
    postSource,
  } = useCreatePostFlow();

  const isSourceSelectionSheetOpen =
    isOpen && currentStep === CREATE_POST_STEPS.SOURCE_SELECTION;

  const isMediaPickerSheetOpen =
    isOpen &&
    currentStep === CREATE_POST_STEPS.CONTENT &&
    postSource === POST_SOURCE.GALLERY;

  const isCameraCaptureSheetOpen =
    isOpen &&
    currentStep === CREATE_POST_STEPS.CONTENT &&
    postSource === POST_SOURCE.CAMERA;

  const isMediaPreviewSheetOpen =
    isOpen && currentStep === CREATE_POST_STEPS.PREVIEW;

  return (
    <div className=''>
      <SourceSelectionSheet
        onClose={handleClose}
        isOpen={isSourceSelectionSheetOpen}
        onSourceSelect={handleSelectSource}
      />

      <MediaPickerSheet
        isOpen={isMediaPickerSheetOpen}
        onMediaSelect={handleSourceSelected}
        onClose={handleClose}
        onConfirm={handlePreviewConfirmed}
      />

      <CameraCaptureSheet
        isOpen={isCameraCaptureSheetOpen}
        onMediaSelect={handleSourceSelected}
        onClose={handleClose}
        onConfirm={handlePreviewConfirmed}

      />

      <MediaPreviewSheet
        isOpen={isMediaPreviewSheetOpen}
        onClose={handleClose}
        onConfirm={handlePreviewConfirmed}
        onRetake={handleRetake}
      />

      {/* 
      {currentStep === CREATE_POST_STEPS.DETAILS && selectedMedia && (
        <PostDetailsForm
          mediaPreviewUrl={selectedMedia.previewUrl}
          onSubmit={handlePublish}
          isPending={isPublishing}
        />
      )}  */}
    </div>
  );
};
